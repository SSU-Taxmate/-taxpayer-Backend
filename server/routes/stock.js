/* base URL
  : /api/stocks
*/
const express = require('express');
const { startSession } = require('mongoose');
const { Stock, ClassStock } = require('../models/Stock');
const router = express.Router();

/*
  default stock (userDefined:false) 미사용.
  : ClassStock에서만 삭제
*/
router.delete("/", (req, res) => {
  ClassStock.find({_id:req.query}, function (err, stock) {
    const result = stock
    if (err) return res.status(500).json({ error: err })
    res.json(result)
  })
})


/*
  [정상] 모든 stock 가져오기 (userDefined 상관 없음)
  : ClassStock {classId:,}
*/
router.get("/", async(req, res) => {
  try{
  const classstock=await ClassStock.find(req.query,"stockId")
  //console.log(req.query,classstock)
  let stocks=[]
  for (let i=0;i<classstock.length;i++){
    stocks.push(classstock[i].stockId)
  }
  //console.log(stocks)
  const result=await Stock.find({_id:{$in:stocks}})
  res.json(result)

}catch(err){
  res.status(500).json({ error: err });
}
})

/*
  사용자 Defined Stock (userDefined:true)
  : Create, Update, Delete
*/
/*
  [정상] DIY stock 생성&사용 : Stock, ClassStock {stockInfo:,classId:}
*/
router.post("/custom", async (req, res) => {
  console.log('create',req.body)
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Stock 생성
    const newstock = new Stock(req.body.stockInfo);
    const savestock = await newstock.save({ session });
    console.log('savestock', savestock);

    // 2) Class-Stock 연관
    const newclass = new ClassStock({ classId: req.body.classId, stockId: newstock._id });
    const sclassstock = await newclass.save({ session });
    console.log('class-stock', sclassstock);

    // 트랜젝션 커밋
    await session.commitTransaction();
    // 끝
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

});
/*
   [정상] DIY stock 수정 : Stock {stockId:, description:null가능, price:{daily update이니까}}
*/
router.put('/custom', (req, res) => {
  console.log('update',req.body)
  Stock.updateOne({ _id: req.body._id }, {$set: req.body.description, $push: {prices:req.body.price} }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
/*
  [정상] DIY stock 삭제&미사용 : ClassStock , Stock  {classId:, stockId: }
*/
router.delete('/custom', async (req, res) => {
  console.log('delete',req.query)
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Class-Stock 연관 삭제
    const delclasstock=await ClassStock.deleteOne({ classId: req.query.classId, stockId: req.query.stockId },{session:session});
    //console.log('del: class-stock', delclasstock);

    // 2) Stock 삭제
    const delstock=await Stock.deleteOne({_id:req.query.stockId},{session:session})
    //console.log('del:stock', delstock);

    // 트랜젝션 커밋
    await session.commitTransaction();
    // 끝
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
  기본 제공 stock (userDefined:false)  /default
  : programmer만 Create, Update, Delete 가능
*/

module.exports = router;
