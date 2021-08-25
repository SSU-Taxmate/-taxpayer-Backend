/* base URL
  : /api/students
*/
const express = require('express');
const router = express.Router();
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { JoinedUser } = require('../models/Class');
const { GrantedHomework } = require('../models/Homework');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');

/*
  [완료] 클래스 내 학생에 대한 모든 정보 
  query{classId:} 로 class에 속한 학생의 userId, studentId는 아는 상황
*/
router.get('/', async (req, res) => {
    console.log("classId:", req.query)

    try {
        // console.log("studentId:",req.params.id,req.query)
        const students = await JoinedUser.find(req.query, ["userId", "alias", "jobId"])
            .populate('userId', 'email name alias jobId').populate('jobId').exec()
        //console.log(students)
        let result = await Promise.all(
            students.map(async (v, i) => {
                const account = await Account.findOne({ 'studentId': v._id })
                return {
                    '_id':v.userId._id,
                    'name': v.userId.name, 'email': v.userId.email,
                    'alias': v.alias, 'job': v.jobId, 'balance': account.currentBalance
                }
            })
        )
        res.json(result)
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }


    //위의 결과로 creditRating, account Rating ....
})
/* 
    클래스 내 학생의 account 에 대한 모든 정보 
*/
router.get('/account', (req, res) => {
    //req.query.classId, req.query.studentId
})



/*
  ====================== 계좌 정보, 거래 내역
*/
/*
  [정상] : 학생 자신의 기본 계좌 정보 가져오기
  : accountId 모르지만, studentId는 아는 상황
*/
router.get('/:id/account', (req, res) => {
    //console.log("studentId",req.params.id)
    Account.findOne({ studentId: req.params.id }, (err, doc) => {
        const result = doc
        if (err) return res.status(500).json({ error: err });
        res.json(result)
    })
})
/*
  [정상] : 학생 자신의 계좌 거래 내역보기
  {accountId:,startDate:,endDate:} <=studentId로 Account에서 찾을 수 있음
*/
router.get('/:id/account/history', async (req, res) => {
    try {
        // console.log("studentId:",req.params.id,req.query)
        const account = await Account.findOne({ studentId: req.params.id })
        //console.log(account)
        const accounttrans = await AccountTransaction.find(
            {
                accountId: account._id,
                date: { $gte: req.query.startDate, $lt: req.query.endDate }
            })
        const result = accounttrans
        //console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }//

})


/*
  ====================== 가입한 금융 상품
*/
/*
  [정상] : 가입한 상품 보여주세요 {studentId:}
  isClosed : false인 것만!
*/
router.get('/:id/deposit', (req, res) => {
    //console.log("studentId:", req.params.id)
    const studentId = req.params.id
    JoinDeposit.findOne({ studentId: studentId, isClosed: false }, ["productId", "amount", "createdAt"])
        .populate("productId").exec((err, data) => {
            const result = data
            //console.log("get:/students/deposit",result)
            if (err) return res.status(500).json({ error: err });
            res.json(result)
        })
})


/*
  [정상] [student] Student의 수행 여부 가져오기
  { studentId:joinedUser의 _id }로 GrantedHomework에서 찾는다. 
  homeworkId는 필요가 없다.
*/
router.get('/:id/homeworks', async (req, res) => {
    try {
        //console.log("studentId:",req.params.id)
        const studentId = req.params.id;
        const ghw = await GrantedHomework.find({ studentId: studentId })
            .populate({ path: 'homeworkId', select: ['name', 'detail', 'expDate'] })
        //console.log('Class숙제와 student의 제출여부\n',ghw)
        let result;
        result = ghw.map((v, i) => {
            return {
                homeworkId: v.homeworkId._id,
                name: v.homeworkId.name,
                detail: v.homeworkId.detail,
                expDate: v.homeworkId.expDate,
                submission: v.submission,
                withinDeadline: v.withinDeadline,
                coupon_id: v.coupon_id,
            }
        })
        //console.log(result)
        res.json(result)
    } catch (err) {
        res.json({ success: false, err })
    }
})

module.exports = router;
