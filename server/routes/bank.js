/* base URL
  : /api/bank
*/
const express = require('express');
const { startSession } = require('mongoose');
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { Deposit } = require('../models/Bank/Deposit');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');

const router = express.Router();

/*
  ============= 금융 상품 (공통) =============
*/
/*
  [정상] 클래스에 속한 예금 상품
  {classId:}
*/
router.get('/deposits', (req, res) => {
  Deposit.find(req.query, (err, doc) => {
    const result = doc;
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})

/*
  ************ 금융 상품 관리 (선생님) *************
*/
/*
  [정상] 예금 상품 추가
  classId 정보도 추가
*/
router.post('/deposits', (req, res) => {
  const cDeposit = new Deposit(req.body)
  cDeposit.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    res.status(200).json({ success: true })
  })
})

/*
  [정상] 예금 상품 수정
*/
router.put('/deposits', (req, res) => {
  Deposit.updateOne(req.body, (err, body) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] 예금 상품 삭제 :id이용.
  : JoinDeposit에서도 삭제 해야 함.
    1) JoinDeposit에 이 예금 상품({productId:req.params.id})에 가입중인 사람이 있다면, (isClosed:false)
    Deposit의 joinPossible 만 true로(나중에 JoinDeposit을 productId로 aggregate해서 isClosed:false가 없다면, 서버에서 알아서 주기적으로 삭제)
    2) JoinDeposit에 가입 중인 사람(isClosed:false)이 없다면, 바로 즉시 2-1)JoinDeposit에서 {productId:req.params.id}로 삭제 2-2)Deposit에서 {_id:req.params.id}로 삭제
*/
router.delete('/deposits/:id', async (req, res) => {
  console.log(req.params.id)
  const depositId = req.params.id

  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    /////////////////////// 이 예금 상품에 가입중인 사람이 있다면, joinPossible true로 하고 나중에 
    const notclosed = await JoinDeposit.find({ productId: depositId, isClosed: false }, { session })
    console.log(!notclosed)//close되어 있다면
    /////////////////////// 삭제 가능하다면 삭제
    const delJoinDeposit = await JoinDeposit.deleteOne({ productId: depositId }, { session })
    console.log(delJoinDeposit)
    const delDeposit = await Deposit.deleteOne({ _id: depositId }, { session })
    console.log(delDeposit)

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }


})

/*
  ************ 금융 상품 가입/해지(학생) *************
*/

/*
  [정상] : 학생의 상품 가입
  productId = req.params.id
  {studentId:,amount:,isClosed:}
*/
router.post('/deposits/:id/join', async (req, res) => {
  const session = await startSession();
  try {
    const productId = req.params.id
    const amount = req.body.amount
    const studentId = req.body.studentId
    //console.log(req.params.id, req.body)

    // 트랜젝션 시작
    session.startTransaction();
    //1) 가입 가능 여부 check
    const joinpossible = await Deposit.findOne({ _id: productId, joinPossible: true })//결과 존재==가입가능하다
    //console.log(joinpossible)
    if (joinpossible) {
      //2) 중복 가입인지 check
      const accountexists = await JoinDeposit.findOne({ studentId: studentId, isClosed: false })
      //console.log(!accountexists)
      if (!accountexists) {//중복 가입이 아니라면,
        //3) 선택한 상품에 비용 지불
        //3-1) 지불 가능한지 check
        const account = await Account.findOne({ studentId: studentId })
        //console.log('가입 계좌',account)
        if (account.currentBalance >= amount) {//지불가능하다면,
          //3-1) 계좌에서는 출금.
          const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- amount) } }, { session })
          //console.log(minus)

          //4) 상품 가입 완료
          const cjoindeposit = new JoinDeposit({ ...req.body, productId: productId })
          const joinin = await cjoindeposit.save({ session })
          //console.log(joinin)

          //5) 계좌 거래 내역에 출금으로 추가
          const transferA = new AccountTransaction({ accountId: account._id, transactionType: 0, amount: amount })
          await transferA.save({ session })

          await session.commitTransaction();
          session.endSession();
          res.status(200).json({
            success: true
          })
        } else {
          throw "잔액 부족"
        }
      } else {
        throw "중복 가입 불가"
      }
    } else {
      throw "신규 가입 중지"
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }
})

/*
  [] : 학생의 상품 해지 요청. isClosed:true, cloasedAt: 현재시점
  put으로 이력을 남긴다면
  req.body.closedAt:"",req.body.isClosed:true

  GET /students/:id/deposit 으로 JoinDeposit의 _id정보 알기 때문에
*/
router.put('/deposits/join', (req, res) => {

  JoinDeposit.updateOne(req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] : 학생의 상품 해지 완료
  GET /students/:id/deposit 으로 JoinDeposit의 _id정보 알기 때문에
*/
router.delete('/deposits/join', async (req, res) => {
  //JoinDeposit._id = req.query._id
  //studentId = req.query.studentId
  const session = await startSession();
  try {
    session.startTransaction();
    // JoinDeposit 확인
    const contract=await JoinDeposit.find({ _id: req.query._id })

    //JoinDeposit의 closedAt : 현재시각 isClosed:true 로 설정한다.


    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }


})
/*
  ********** 거래 ***********
  - market 내 구입, 이체 해야 하는 상황
  - 세금 납부(원천징수)/벌금 납부(to: 국세청)와 구분 필요
*/
//이체
router.post('/transfer', async (req, res) => {

  const session = await startSession();
  try {
    const sender = req.body.sender//로그인한 student의 accountId
    const receiver = req.body.receiver//선택한 student의 accountId
    const amount = req.body.amount;//이체 금액
    // 트랜젝션 시작
    session.startTransaction();
    // 1) 출금 계좌 from
    // 1-1) 출금 계좌 확인
    const balance = await Account.findOne({ _id: sender }, "currentBalance")
    console.log(balance, amount)
    if (balance.currentBalance >= amount) {
      //1-2) 출금
      const minus = await Account.updateOne({ _id: sender }, { $inc: { currentBalance: (- amount) } }, { session })
      // 1-3) 출금 기록
      const transferA = new AccountTransaction({ accountId: sender, transactionType: 0, amount: amount })
      await transferA.save({ session })

      // 2) 입금 계좌 to
      // 2-1) 입금 계좌 확인& 입금
      const plus = await Account.updateOne({ _id: receiver }, { $inc: { currentBalance: amount } }, { session })

      // 2-2) 입금 기록 
      const transferB = new AccountTransaction({ accountId: receiver, transactionType: 1, amount: amount })
      await transferB.save({ session })

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({
        success: true
      })
    } else {
      throw "잔액부족"
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

})

module.exports = router;
