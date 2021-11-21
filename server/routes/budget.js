/*
    baseURL : /api/budget
 */
const express = require("express");
const { startSession } = require("mongoose");
const { Budget } = require("../models/Tax/Budget");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

/*
  [정상] : 예산 사용
  {classId:}
*/
router.post("/", async (req, res) => {
  const classId = req.body.classId;
  //body:{type:culture/education/environment/etc,amount:10}
  const session = await startSession();
  try {
    session.startTransaction();
    // 세출 추가
    const type = req.body.type;
    Budget.updateOne(
      { classId: classId },
      { $inc: { [`expenditure.${type}`]: req.body.amount } }
    ).exec({ session });

    // 트랜젝션 커밋
    await session.commitTransaction();
    // 트랜젝션 종료
    session.endSession();
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
});
/*
  [] :전체기간 학급 계좌 확인
  : Budget History 부분에서 aggregate로 계산하기
*/
router.get("/", (req, res) => {
    const classId = req.query.classId;
    Budget.findOne({classId:classId},(err,doc)=>{
      const result={
        balance:doc.revenue.income+doc.revenue.realestate+doc.revenue.vat+doc.revenue.stock+doc.revenue.fine,
        debet : doc.debet
      }
      console.log(result)
      if (err) return res.status(500).json({ error: err });
      
      res.json(result);
    });
});
/*
  [month:month+1추가] : 이번달 학급 예산 상황 보기
*/
router.get("/month", (req, res) => {
  const classId = req.query.classId;
  const month= req.query.month;
  Budget.findOne({ classId: classId, month:month+1}, (err, doc) => {// 
    const result = doc;
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});
/*
  [] : 학급 예산 월별 기록
  BudgetHistory를 삭제하고 
  Budget에 저장된 월 정보를  
*/
router.get("/history", async (req, res) => {
  const classId = req.query.classId;
  try {
    const history = await Budget.aggregate([
      {
        $match: {
          classId: ObjectId(classId),
        },
      },
      {
        $group: {
          _id: "$month",
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);
    res.json(history);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
