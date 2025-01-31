/* base URL
  : /api/bank
*/
const express = require('express');
const { startSession } = require('mongoose');
const {Tax}=require('../models/Tax/Tax')
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { Deposit } = require('../models/Bank/Deposit');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');

const router = express.Router();

const TRANSACTION_TYPE = {
  WITHDRAWAL: 0, // 출금
  DEPOSIT: 1    // 입금
};

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
  Deposit.updateOne({ $set: req.body }, (err, body) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [정상] 예금 상품 삭제 
  : 
    1) JoinDeposit에 이 예금 상품({productId:req.params.id})에 가입중인 사람이 있다면, (isClosed:false)
    Deposit의 joinPossible 만 true로(나중에 JoinDeposit을 productId로 aggregate해서 isClosed:false가 없다면, 삭제)
    2) JoinDeposit에 가입 중인 사람(isClosed:false)이 없다면, 바로 즉시 2-1)JoinDeposit에서 {productId:req.params.id}로 삭제 2-2)Deposit에서 {_id:req.params.id}로 삭제
*/
router.delete('/deposits/:id', async (req, res) => {
  const depositId = req.params.id;

  const session = await startSession();
  try {
    session.startTransaction();

    // 트랜잭션 내에서 가입 중인 학생이 있는지 확인
    const hasJoiners = await JoinDeposit.findOne({ productId: depositId, isClosed: false }).session(session);

    if (!hasJoiners) {
      // 예금 상품에 가입 중인 사람이 없다면 삭제 가능
      await JoinDeposit.deleteMany({ productId: depositId }).session(session);
      await Deposit.deleteOne({ _id: depositId }).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: '성공적으로 상품 삭제가 완료되었습니다.'
      });
    } else {
      // 예금 상품에 가입 중인 사람이 있으면 상태만 변경
      await Deposit.updateOne({ _id: depositId }, { $set: { joinPossible: false } }).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: '가입 기간이 남은 학생이 있어서 실패하였습니다. 더 이상 가입 불가능하도록 설정하였습니다.'
      });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, err: err.message });
  }
});

/*
  ************ 금융 상품 가입/해지(학생) *************
*/

/*
  [정상] : 학생의 예금 상품 가입
*/
router.post('/deposits/:id/join', async (req, res) => {
  const session = await startSession();
  try {
    const productId = req.params.id
    const amount = req.body.amount
    const studentId = req.body.studentId

    session.startTransaction();
    //1) 가입 가능 여부 check
    const joinpossible = await Deposit.findOne({ _id: productId, joinPossible: true }).exec({session})//결과 존재==가입가능하다
    if (!joinpossible) {
      throw "신규 가입 중지"
    }

    //2) 중복 가입인지 check
    const accountexists = await JoinDeposit.findOne({ studentId: studentId, isClosed: false }).exec({session})
    if (accountexists) {//중복 가입이 아니라면,
      throw "중복 가입 불가"
    } 
    //3) 선택한 상품에 비용 지불
    //3-1) 지불 가능한지 check
    const account = await Account.findOne({ studentId: studentId }).exec(session)
    //console.log('가입 계좌',account)
    if (account.currentBalance < amount) {//지불가능하다면,
      throw "잔액 부족"
    }
    
    //3-1) 계좌에서는 출금.
    await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- amount) } }).exec({session})

    //4) 상품 가입 완료
    const cjoindeposit = new JoinDeposit({ ...req.body, productId: productId })
    await cjoindeposit.save({ session })

    //5) 계좌 거래 내역에 출금으로 추가
    const transferA = new AccountTransaction({
        accountId: account._id, 
        transactionType: TRANSACTION_TYPE.WITHDRAWAL, 
        amount: amount, 
        memo: '예금상품가입',
        afterbalance:account.currentBalance - amount})
    await transferA.save({ session })

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({success: true})
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, err: err.message });
  }
})
/*
  [정상] : 학생의 예금 상품 해지 
*/
router.delete('/deposits/:id/join/:joinId', async (req, res) => {
  const depositId = req.params.id//deposit 이율 정보 위해
  const joinId = req.params.joinId
  const classId=req.query.classId
  const session = await startSession();
  try {
    session.startTransaction();
    // 1) 적용 이율 계산
    // 1-1) JoinDeposit 의 createdAt 
    const contract = await JoinDeposit.findOne({ _id: joinId }).exec({ session })
    const product = await Deposit.findOne({ _id: depositId }).exec({ session })
    if (!contract || !product) {
      throw new Error("계약 또는 상품 정보 없음");
    }
    
    const today = new Date()
    const create = new Date(contract.createdAt)
    const diff = Math.round((today.getTime() - create.getTime()) / (1000 * 3600 * 24))//가입기간
    const rate = diff >= product.minDuration ? product.interestRate : 0;

    // 2) JoinDeposit의 closedAt : 현재시각 isClosed:true 로 설정.
    await JoinDeposit.updateOne({ _id: contract._id }, { $set: { isClosed: true, closedAt: today } }).exec({session})

    // 3) Account에 입금
    // 3-1) rate를 토대로 해지 후 금액 구하기
    const newamount = Math.round((rate + 100) * contract.amount / 100)
    // 3-2) Account currentBalance update
    const account = await Account.findOne({ studentId: contract.studentId }).exec({ session })
    if (!acoount) { 
      throw "계좌 정보 없음";
    }

    await Account.updateOne({ studentId: contract.studentId }, { $inc: { currentBalance: (+ newamount) } }).exec({session})

    // 4) AccountTransaction 입금 기록
    // 4-1) AccountId 찾기
    const transferB = new AccountTransaction({ 
      accountId: account._id, 
      transactionType: TRANSACTION_TYPE.DEPOSIT, 
      amount: newamount, 
      afterbalance:account.currentBalance+newamount,
      memo: "예금상품해지" })
    await transferB.save({ session })
    //5) 예금으로 얻은 수익이 0보다 크다면, 소득세 부여
    if (rate * contract.amount > 0) {
      const classtax = await Tax.findOne({ classId: classId }).exec({ session })
      if (!classtax) {
        throw new Error("세금 정보 없음");
      }

      const taxrate = classtax.taxlist.income
      const incometax = Math.round(taxrate*rate*contract.amount/10000)
      await Account.updateOne({ studentId: contract.studentId }, { $inc: { currentBalance: (- incometax) } }).exec({ session })
      
      const account2 = await Account.findOne({ studentId: contract.studentId }).exec({ session })
      const transferC = new AccountTransaction({ 
        accountId: account._id, 
        transactionType: TRANSACTION_TYPE.WITHDRAWAL, 
        amount: incometax, 
        afterbalance:account2.currentBalance - incomeTax,
        memo: "소득세" })
      await transferC.save({ session })
    }

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
  - 필요시 memo정보도 함께보내기
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
    const balance = await Account.findOne({ _id: sender }, "currentBalance").exec({session})
    //console.log(balance, amount)
    if (balance.currentBalance >= amount) {
      //1-2) 출금
      const minus = await Account.updateOne({ _id: sender }, { $inc: { currentBalance: (- amount) } }).exec({session})
      // 1-3) 출금 기록
      const transferA = new AccountTransaction({ 
        accountId: sender, 
        transactionType: TRANSACTION_TYPE.WITHDRAWAL, 
        amount: amount, 
        afterbalance:balance.currentBalance-amount,
        memo: '계좌이체' })
      await transferA.save({ session })

      // 2) 입금 계좌 to
      // 2-1) 입금 계좌 확인& 입금
      const plus = await Account.updateOne({ _id: receiver }, { $inc: { currentBalance: amount } }).exec({session})

      // 2-2) 입금 기록 
      const transferB = new AccountTransaction({ 
        accountId: receiver,
        transactionType: TRANSACTION_TYPE.DEPOSIT,
        amount: amount,
        afterbalance:balance.currentBalance+amount,
        memo:'계좌이체'
      })
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
