/*
    baseURL : /api/budget
 */
const express = require('express');
const { startSession } = require('mongoose');
const { Budget } = require('../models/Tax/Budget');
const{BudgetAccount}=require('../models/Tax/BudgetAccount')
const { BudgetHistory } = require('../models/Tax/BudgetHistory');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

/*
  [정상] : 예산 사용[1달 단위로 budgetaccount에 업데이트]
  {classId:}
*/
router.post('/', async (req, res) => {
  const classId = req.body.classId
  //body:{type:culture/education/environment/etc,amount:10}
  //console.log(classId)
  const session = await startSession();
  try {
    session.startTransaction();
    // 세출 추가
    const type = req.body.type
    Budget.updateOne({ classId: classId },
      { $inc: { [`expenditure.${type}`]: req.body.amount } }).exec({ session })

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
  [정상] :전체기간 학급 계좌 확인
*/
router.get('/',(req,res)=>{
  const classId = req.query.classId
  BudgetAccount.findOne({ classId: classId }, (err, doc) => {
    const result = doc
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [정상] : 이번달 학급 예산 상황 보기
  {classId:}
*/
router.get('/month', (req, res) => {
  const classId = req.query.classId
  Budget.findOne({ classId: classId }, (err, doc) => {
    const result = doc
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [] : 학급 예산 월별 기록
  {classId:}
*/
router.get('/history', async (req, res) => {
  const classId = req.query.classId
  try {
    const history = await BudgetHistory.aggregate([
      {
        $match: {
          "classId": ObjectId(classId)
        }
      },
      {
        $group:
        {
          _id:{
            'transType':'$transType',
            'month':{$month:{date:'$date',timezone:'Asia/Seoul'}},//group by multiple&timezone
          },
          sum:{$sum:'$amount'}
        }
      },
      { $sort:{
        '_id.month':1,
        '_id.transType':1
      }}
    ])
    //console.log(history)
    
    res.json(history)
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }

})

module.exports = router;
