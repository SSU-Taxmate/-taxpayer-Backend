/* base URL
    : /api/jobs
*/
const express = require('express');
const { Job } = require('../models/Job/Job');
const router = express.Router();
const { JoinedUser } = require('../models/JoinedUser');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction')
const { Tax } = require('../models/Tax/Tax');
const { Budget } = require('../models/Tax/Budget');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/*
    [Post] 직업 생성
*/
router.post('/', (req, res) => {
    const newJob = new Job(req.body);

    // job생성시 이름이 중복으로 존재하는지 체크함
    const exJob = Job.findOne({ jobId: req.body.jobId });
    if (exJob) {
        console.log('존재하는 직업입니다.');
        res.send('job_create_error=exist');
        next(error);
    }

    newJob.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

/*
    [GET] 클래스 내 모든 직업 _ 관리자 모드
    : {classId:} ondelete 관계 없이
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
    [GET] 클래스 내 모든 직업 _ 학생 모드
    : {classId:} ondelete:false
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
    [PUT] 직업 정보 수정=>없애기로 함 
    Job 정보 업데이트 => 삭제하고 수정안되도록 하자.

router.put('/', (req, res) => {
    Job.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
})
*/


/*  <일요일-같이 해결하자>
    Job 삭제 -> 예금 삭제처럼 된 로직 
    Job 삭제 급여를 줬는지 안줬는지, 고용한 사람의 직업인지
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
    1. 해당 잡에 고용중인 학생만 볼 수 있게 _라우터 이름 바꿨으면=> CLIENT에서도 찾아서 바꾸자
*/
router.get('/:id/students', (req, res) => {
    const jobId = req.params.id
    const classId = req.query.classId
    JoinedUser.aggregate([{
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
    1.2. 고용당한 학생을 다 모아볼 수 있는거
    
*/
/*
1.3. 
    해당 직업을 가지고 있는 모든 학생 =>Contract에서 찾도록 해야 함.
*/

/**
    2. 지원한 사람들 모아서 볼수 있는 거[선생님]
 */
/**
 * 2.1._ 허락/거절 할 때 db에 반영되도록
 * 
 */
/**
 * 3. 학생 자신의 지원 결과 및 지원 여부를 볼 수 있는 라우터 
 * 
 */


/*
  Job마다 salary 부여&세금 부여=>PayBill생성
  급여명세서_급여를 줬는 안줬는지
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
            for await (const job of userjob) { //user가 가지고 있는 job들
                const account = await Account.findOne({ studentId: v._id }).exec({ session })
                // 2) 월급
                const give = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: job.salary } }).exec({ session })
                const after = await Account.findOne({ studentId: v._id }).exec({ session })
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
                    const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: -incometax } }).exec({ session })
                    const after2 = await Account.findOne({ studentId: v._id }).exec({ session })
                    //3-3) 통장에 내역 기록 -------------------------
                    const paytax = new AccountTransaction({
                        accountId: account._id,
                        transactionType: 0,
                        amount: incometax,
                        afterbalance: after2.currentBalance, //
                        memo: '소득세'
                    })
                    await paytax.save({ session })
                    // 3-4) Budget의 income에 추가
                    const budget = await Budget.updateOne({ classId: classId }, { $inc: { "balance.income": +incometax } }).exec({ session })
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
// 월급 명세서 보여주는 화면 추가

module.exports = router;