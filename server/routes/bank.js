/* base URL
  : /api/bank
*/
const express = require('express');
const { DepositProduct } = require('../models/Bank/DepositProduct');
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
  DepositProduct.find(req.query,(err,doc)=>{
    const result=doc;
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
router.post('/deposits',  (req, res) => {
  const cdepositproduct=new DepositProduct(req.body)
  cdepositproduct.save((err,doc)=>{
    if(err)return res.json({success:false,err})
    res.status(200).json({success: true})
  })
})

/*
  [정상] 예금 상품 수정
*/
router.put('/deposits', (req, res) => {
  DepositProduct.updateOne(req.body,(err,body)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] 예금 상품 삭제 
  : JoinDeposit에서도 삭제 해야 함.
    JoinDeposit에 이 예금 상품에 가입중인 사람이 있다면, (isClosed:false)
    이 예금 상품은 삭제하지 못한다.
    혹은
    바로 강제 해지를 시킨후, 사용자에게 돌아간다.
*/
router.delete('/deposits/:id',  (req, res) => {
  console.log(req.params.id)
  const depositId=req.params.id
  DepositProduct.deleteOne({_id:depositId},(err,doc)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})

/*
  ************ 금융 상품 가입/해지(학생) *************
*/

/*
  [정상] : 상품 가입
  productId = req.params.id
  {studentId:,assets:,isClosed:}
*/
router.post('/deposits/:id/join', async (req, res) => {
  const productId=req.params.id
  console.log(req.params.id,req.body)
  const cjoindeposit=new JoinDeposit({...req.body,productId:productId})
  cjoindeposit.save((err,doc)=>{
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ success: true })
  })
})

/*
  [] : 상품 해지 요청. isClosed:true, cloasedAt: 현재시점
  put으로 이력을 남긴다면
  req.body.closedAt:"",req.body.isClosed:true

    GET /students/:id/deposit 으로 JoinDeposit의 _id정보 알기 때문에
*/
router.put('/deposits/join', (req, res) => {

  JoinDeposit.updateOne(req.body,(err,doc)=>{
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [] : 상품 해지 완료
  GET /students/:id/deposit 으로 JoinDeposit의 _id정보 알기 때문에
*/
router.delete('/deposits/join',  (req, res) => {
  const productId=req.params.id

})
/*
  ********** 거래 ***********
  : 상품 구매, 월급(세금), 벌금,
*/


module.exports = router;
