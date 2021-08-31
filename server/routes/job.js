/* base URL
  : /api/jobs
*/
const express = require('express');
const { Job } = require('../models/Job');
const router = express.Router();
const { JoinedUser } = require('../models/JoinedUser');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { Tax } = require('../models/Tax/Tax');
const { Budget } = require('../models/Tax/Budget');
/*
  [정상] Job 생성
  {classId: , Job정보들~}
*/
router.post('/', (req, res) => {
  //console.log('job post', req.body)
  const newJob = new Job(req.body);
  newJob.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

/*
  [정상] 클래스 별 모든 Job 불러오기
  : Job에서 classId 이용. {classId:}
*/
router.get('/', (req, res) => {
  //console.log('job get', req.query)
  Job.find(req.query, function (err, jobs) {
    //console.log(jobs)
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
  [] Job 삭제 -> 예금 삭제처럼 로직 바꿔야 함.
  : JoinedUser에 저장되어 있는 JobId도 없어져야 함.
*/
router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  const session = await startSession();
  try {
    session.startTransaction();
    const jobId = req.params.id;
    const res1 = await JoinedUser.updateMany({}, { $pull: { jobId: jobId } }).exec({ session })
    console.log(res1)
    const res2 = await Job.deleteOne({ _id: jobId }).exec({ session })
    console.log(res2)
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
  [완성]Job마다 salary 부여&세금 부여
*/
router.post('/salary', async (req, res) => {
  const classId = req.query.classId
  const session = await startSession();
  try {
    session.startTransaction();

    // 1) student의 job & account 확인
    const jobs = await JoinedUser.find({ classId: classId }).exec({ session })
    //console.log('jobs',jobs)

    for await(const v of jobs) {
      const userjob = await Job.find({ '_id': { $in: v.jobId } }).exec({ session })
      //console.log('*')
      for await(const job of userjob) {//user가 가지고 있는 job들
        //console.log('x')
        const account = await Account.findOne({ studentId: v._id })
        //console.log(account.currentBalance,account.alias,'+',job.salary)
        // 2) 월급
        const give = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: job.salary } }).exec({ session })
        //console.log(give)
        const after = await Account.findOne({studentId:v._id})
        //console.log(after.currentBalance)
        const grantsalary = new AccountTransaction({
          accountId: account._id,
          transactionType: 1,
          amount: job.salary,
          afterbalance: after.currentBalance,//
          memo: '월급'
        })
        await grantsalary.save({ session })
        // 3) 세금
        //3-1) 세금 비율 확인
        const tax = await Tax.findOne({ classId: classId }).exec({ session })
        const incometax = await Math.round(tax.taxlist.income * job.salary / 100)
        //3-2) 통장에서 세금 징수
        const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: - incometax } }).exec({ session })
        const after2 = await Account.findOne({studentId:v._id})
        //console.log('-',incometax,after2.currentBalance)
        //3-3) 통장에 내역 기록 
        const paytax = new AccountTransaction({
          accountId: account._id,
          transactionType: 0,
          amount: incometax,
          afterbalance: after2.currentBalance,//
          memo: '소득세'
        })
        await paytax.save({ session })
        // 3-4) Budget의 income에 추가
        const budget=await Budget.updateOne({classId:classId},{$inc: { "balance.income": + incometax }}).exec({session})
      
      }
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

module.exports = router;
