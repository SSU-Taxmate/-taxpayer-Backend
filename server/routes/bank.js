/* base URL
  : /api/bank
*/
const express = require('express');
const { Account, ClassAccount } = require('../models/Bank/Account');
const { BankTransaction } = require('../models/Bank/BankTransaction');
const { DepositProduct } = require('../models/Bank/DepositProduct');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');

const router = express.Router();
/*
  ********** 거래 ***********
  : 상품 구매, 월급(세금), 벌금,
*/
/*
  거래내역확인
*/
router.get('/account/',(req,res)=>{
  
})


/*
  ********** 계좌 (학급) ***********
*/
/*
  [정상] : 학급 계좌(예산) 보기
  {classId:}
*/
router.get('/account', (req, res) => {
  ClassAccount.findOne(req.query,(err,doc)=>{
    const result=doc
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  ********** 계좌, 거래 내역(학생) ***********
*/

/*
  [정상] : 자신의 계좌 보기
  {studentId:}
*/
router.get('/student/account', (req, res) => {
  Account.findOne(req.query,(err,doc)=>{
    const result=doc
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [] : 계좌 거래 내역보기
  {accountId:,startDate:,endDate:}<=studentId로 Account에서 찾을 수 있음
  쿼리 이렇게 쓰는 건가요
*/
router.get('/student/account/transaction', (req, res) => {
  BankTransaction.find(
    {accountId:req.query.accountId,
     $and:[{createdAt:{$gte:req.query.startDate}},{createdAt:{$gte:req.query.endDate}}]},(err,doc)=>{
    const result=doc
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  ********** 금융 상품 관련(공통) ***********
*/
/*
  [정상] 클래스에 속한 예금 상품 보여줘요
  {classId:}
*/
router.get('/deposit', (req, res) => {
  DepositProduct.find(req.query,(err,doc)=>{
    const result=doc;
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})

/*
  ********** 금융 상품 관련(선생님) ***********
*/
/*
  [정상] 예금 상품 추가
  classId 정보도 추가
*/
router.post('/deposit', async (req, res) => {
  const cdepositproduct=new DepositProduct(req.body)
  cdepositproduct.save((err,doc)=>{
    if(err)return res.json({success:false,err})
    res.status(200).json({success: true})
  })
})

/*
  [정상] 예금 상품 수정
*/
router.put('/deposit', (req, res) => {
  DepositProduct.updateOne(req.body,(err,body)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] 예금 상품 삭제 
  : JoinDeposit에서 삭제 해야 함
*/
router.delete('/deposit', async (req, res) => {
  DepositProduct.deleteOne(req.query,(err,doc)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})


/*
  ********** 금융 상품 관련(학생) ***********
*/
/*
  [정상] : 상품 가입{accountId:,productId:,assets:,isClosed:}
*/
router.post('/student/deposit', async (req, res) => {
  const cjoindeposit=new JoinDeposit(req.body)
  cjoindeposit.save((err,doc)=>{
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ success: true })
  })
})
/*
  [절반정상-보내는 형식 최적화] : 가입한 상품 보여주세요 {studentId:}
  isClosed : false인 것만!
*/
router.get('/student/deposit', (req, res) => {
  JoinDeposit.find({studentId:req.query.studentId,isClosed:false},["productId","assets","createdAt"])
  .populate("productId").exec((err,data)=>{
    const result=data
    //console.log("get:/student/deposit",result)
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [] : 상품 해지. isClosed:true, cloasedAt: 현재시점
  put으로 이력을 남긴다면
*/
router.put('/student/deposit', (req, res) => {
  JoinDeposit.updateOne(req.body,(err,doc)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] : 해지
*/
router.delete('/student/deposit', async (req, res) => {

})

module.exports = router;
