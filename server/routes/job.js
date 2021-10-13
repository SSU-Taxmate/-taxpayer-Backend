/* base URL
  : /api/jobs
*/
const express = require('express');
const { Job } = require('../models/Job');
const router = express.Router();
const { JoinedUser } = require('../models/JoinedUser');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const {AccountTransaction}=require('../models/Bank/AccountTransaction')
const { Tax } = require('../models/Tax/Tax');
const { Budget } = require('../models/Tax/Budget');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/*
  [정상] Job 생성
  {classId: , Job정보들~}
*/
router.post('/', (req, res) => {
  const newJob = new Job(req.body);
  newJob.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

/*
  [정상] 선생님용클래스 별 모든 Job 불러오기
  : Job에서 classId 이용. {classId:} ondelete 관계 없이
*/
router.get('/manage', (req, res) => {
  const classId = req.query.classId
  Job.find({ classId: classId }, function (err, jobs) {
    const result = jobs
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [정상] 학생용 클래스 별 모든 Job 불러오기 -apply하는 곳에서는 안보여야 한다
  : Job에서 classId 이용. {classId:} ondelete:false
*/
router.get('/', (req, res) => {
  const classId = req.query.classId
  Job.find({ classId: classId, ondelete: false }, function (err, jobs) {
    const result = jobs
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})

/*
  [정상] Job 정보 업데이트
  : Job 에서 Job._id 이용
*/
router.put('/', (req, res) => {
  Job.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [완료] Job 삭제 -> 예금 삭제처럼 로직됨
*/
router.delete('/:id', async (req, res) => {
  const jobId = req.params.id;

  const session = await startSession();
  try {
    session.startTransaction();

    // joinedUser에 jobId가 없다면 (해당 job을 가진 학생이 없다)
    const havejob = await JoinedUser.countDocuments({ jobId: jobId }).exec({ session })
    if (havejob <= 0) {
      //job 
      const res1 = await JoinedUser.updateMany({}, { $pull: { jobId: jobId } }).exec({ session })

      //job 삭제
      const res2 = await Job.deleteOne({ _id: jobId }).exec({ session })
    } else {
      const res3 = await Job.updateOne({ _id: jobId }, { $set: { ondelete: true } }).exec({ session })
    }

    // 트랜젝션 커밋
    await session.commitTransaction();
    // 트랜젝션 종료
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
})

/*
  [정상]해당 직업을 가지고 있는 모든 학생
*/
router.get('/:id/students', (req, res) => {
  const jobId = req.params.id
  const classId = req.query.classId
  JoinedUser.aggregate([
    {
      $match: {
        'classId': ObjectId(classId),
        'jobId': ObjectId(jobId)
      }
    },
    {
      $project: {
        "userId": '$userId',
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        "name": '$user.name'
      }
    },
  ]).exec((err, employee) => {
    const result = employee
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})

/*
  [완성]Job마다 salary 부여&세금 부여
*/
router.post('/salary', async (req, res) => {
  console.log('/salary', req.body)
  const classId = req.body.classId
  const session = await startSession();
  try {
    session.startTransaction();

    // 1) student의 job & account 확인
    const jobs = await JoinedUser.find({ classId: classId }).exec({ session })
    //let i =0;
    for (const v of jobs) {
      //console.log('>>>>>>',i,'>>>>>>',v)
      //i++;
      const userjob = await Job.find({ '_id': { $in: v.jobId } }).exec({ session })
      for await (const job of userjob) {//user가 가지고 있는 job들
        const account = await Account.findOne({ studentId: v._id }).exec({session})
        // 2) 월급
        const give = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: job.salary } }).exec({ session })
        const after = await Account.findOne({ studentId: v._id }).exec({session})
        const salary = new AccountTransaction({
          accountId: account._id,
          transactionType: 1,
          amount: job.salary,
          afterbalance: after.currentBalance,
          memo: '월급'
        })
        await salary.save({ session })
        
        // 3) 세금
        //3-1) 세금 비율 확인
        const tax = await Tax.findOne({ classId: classId }).exec({ session })
        const incometax = Math.round(tax.taxlist.income * job.salary / 100)
        //3-2) 통장에서 세금 징수
        if (incometax > 0) {
          const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: - incometax } }).exec({ session })
          const after2 = await Account.findOne({ studentId: v._id }).exec({session})
          //3-3) 통장에 내역 기록 -------------------------
          const paytax = new AccountTransaction({
            accountId: account._id,
            transactionType: 0,
            amount: incometax,
            afterbalance: after2.currentBalance,//
            memo: '소득세'
          })
          await paytax.save({ session })
          // 3-4) Budget의 income에 추가
          const budget = await Budget.updateOne({ classId: classId }, { $inc: { "balance.income": + incometax } }).exec({ session })
        }
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    console.log(err)
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
})

module.exports = router;
