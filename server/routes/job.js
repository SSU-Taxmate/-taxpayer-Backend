/* base URL
    : /api/jobs
*/
const express = require('express');
const router = express.Router();
const { Job } = require('../models/Job/Job');
const { User } = require('../models/User')
const { JoinedUser } = require('../models/JoinedUser');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction')
const { Tax } = require('../models/Tax/Tax');
const { Budget } = require('../models/Tax/Budget');
const { JobApply } = require('../models/Job/JobApply');
const mongoose = require("mongoose");
const { Contract } = require('../models/Job/Contract');
const { PayBill } = require('../models/Job/PayBill');
const moment = require('moment-timezone')

const ObjectId = mongoose.Types.ObjectId;
/*
    [Post] 직업 생성
*/
router.post('/', async (req, res) => {
    const classId = req.body.classId
    const jobname = req.body.name
    try {
        // job생성시 이름이 중복으로 존재하는지 체크함
        const exJob = await Job.findOne({ classId: classId, name: jobname });
        console.log(exJob)
        if (exJob) {
            console.log('존재하는 직업입니다.');
            throw ('job_create_error=exist');
        }
        const newJob = new Job(req.body);
        newJob.save()
        res.status(200).json({ success: true })
    } catch (err) {
        res.json({ success: false, err });
    }

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
    [GET] 직업별 지원자 확인_선생님
 */
router.get('/:jobId/applicants', async (req, res) => {
    const jobId = req.params.jobId;
    const session = await startSession();
    try {
        session.startTransaction();

        const appliances = await JobApply.find({ jobId: jobId }).exec({ session })
        let applicants = await Promise.all(
            appliances.map(async (v, i) => {
                const applicantId = await JoinedUser.findOne({ _id: v.joinedUser._id })
                const applicant = await User.findOne({ _id: applicantId.userId })
                return { name: applicant.name, studentId: applicantId._id }
            })
        )

        await session.commitTransaction();
        session.endSession();

        res.status(200).json(applicants)
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        session.endSession();
        res.json({ success: false, err });
    }

})
/*
    [POST] 직업 지원_학생
*/
router.post('/apply', (req, res) => {
    const appliance = new JobApply(req.body)
    appliance.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })

})
/**
 * [GET] 고용 or 탈락
 */
router.get('/hire', async (req, res) => {
    const hiring = req.body.hiring //true, false
    const classId = req.body.classId
    const joinedUser = req.body.joinedUser
    const jobId = req.body.jobId
    console.log(req.body)
    const session = await startSession();
    try {
        session.startTransaction();

        if (hiring) {    // 고용 => 계약서 작성
            const job = await Job.findOne({ _id: jobId }).exec({ session })
            const contractedJob = {_id:job._id, name: job.name, salary: job.salary, whatdo: job.whatdo }
            console.log(job, contractedJob)
            const newcontract = new Contract({ classId: classId, joinedUser: joinedUser, job: contractedJob })
            console.log(newcontract)

            await newcontract.save({ session })
        }
        // 지원서 상태 업데이트
        await JobApply.updateOne({ classId: classId, joinedUser: joinedUser, jobId: jobId }, { state: hiring ? 'allow' : 'reject' }).exec({ session })

        await session.commitTransaction();
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
    [POST]월급 부여 
    월급 부여 날인 경우
*/
router.post('/paysalary', async (req, res) => {
    console.log('/paysalary', req.body)
    const classId = req.body.classId
    const session = await startSession();
    try {
        session.startTransaction();
        // 클래스별로 하나 존재하는 PayBill확인
        const paybill = await PayBill.findOne({ classId: classId })

        // 1) student의 job 확인_월급날이 아닌 경우 제거
        const contracts = await Contract.find({ classId: classId, payday: moment().date() }).exec({ session })

        for (const contract of contracts) {
            const job = contract.job
            //한 학생이 해당 월에 대한 직업의 급여을 받았는가?
            const payed = await paybill.employees.filter(v => v.jobname==job.name && moment(v.payedDate).month() == moment().month() && v.joinedUser.toString() == contract.joinedUser.toString())
            
            // 월급 명세서 확인
            if (payed.length == 0) {
                await PayBill.updateOne({ classId: classId }, { $push: { joinedUser: contract.joinedUser, payedDate: moment(), payment: job.salary,jobname:job.name } }).exec({ session })

                // 1)월급 통장 찾기
                const account = await Account.findOne({ studentId: contract.joinedUser }).exec({ session })
                // 2) 월급
                const give = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: job.salary } }).exec({ session })
                const afterpayment = await Account.findOne({ studentId: contract.joinedUser }).exec({ session })
                const salary = new AccountTransaction({
                    accountId: account._id,
                    transactionType: 1,
                    amount: job.salary,
                    afterbalance: afterpayment.currentBalance,
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
                    const after2 = await Account.findOne({ studentId: contract.joinedUser }).exec({ session })
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
                    const budget = await Budget.updateOne({ classId: classId }, { $inc: { "revenue.income": +incometax } }).exec({ session })
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

/*

*/
module.exports = router;