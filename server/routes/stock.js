/* base URL
  : /api/stocks
*/
const express = require('express');
const { startSession } = require('mongoose');
const { Stock, ClassStock } = require('../models/Stock/Stock');
const router = express.Router();
/*
  [정상] Default Stock 모두 가져오기
*/
router.get('/',(req,res)=>{
  Stock.find({userDefined:false},(err,doc)=>{
    res.json(doc)
    if (err) return res.status(500).json({ error: err })
  })
})

/*
  [정상] Default Stock 사용
*/
router.post("/use", (req, res) => {
  const usestock = new ClassStock(req.body)//{classId:,stockId:}
  usestock.save((err, doc) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json({
      success: true
    })
  })
})

/*
  [정상] 클래스에서 사용하는 모든 stock 가져오기
  : ClassStock {classId:,}
*/
router.get("/use", async (req, res) => {
  try {
    const classstock = await ClassStock.find(req.query, "stockId")
    console.log(req.query, classstock)
    let stocks = []
    for (let i = 0; i < classstock.length; i++) {
      stocks.push(classstock[i].stockId)
    }
    //console.log(stocks)
    const result = await Stock.find({ _id: { $in: stocks } })
    //console.log(result)
    res.json(result)

  } catch (err) {
    res.status(500).json({ error: err });
  }
})

/*
  [정상] default stock (userDefined:false) 미사용.
  : ClassStock에서만 삭제
*/
router.delete("/use", (req, res) => {
  //console.log(req.query)
  ClassStock.deleteOne({ stockId: req.query._id, classId: req.query.classId }, function (err, stock) {
    const result = stock
    if (err) return res.status(500).json({ error: err })
    res.status(200).json({
      success: true
    })
  })
})


/*
  사용자 Defined Stock (userDefined:true)
  : Create, Update, Delete
*/
/*
  [정상] DIY stock 생성&사용 
  : Stock, ClassStock body-{stockInfo:{userDefined:true필수},classId:}필수
*/
router.post("/custom", async (req, res) => {
  //console.log('create', req.body)
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
  [정상] DIY stock 가져오기(true)
  : ClassStock에서 classId이용해서 다 stockId를 찾은다음에,
    Stock에서 위의 결과를 이용해서 userDefined가 false인 것을 찾는다.
*/
router.get("/custom", async (req, res) => {
  try {
    const allusestock = await ClassStock.find(req.query)
    let stockIds = []
    for (let i = 0; i < allusestock.length; i++) {
      stockIds.push(allusestock[i].stockId)
    }
    //console.log(stockIds)
    const userstock=await Stock.find({ _id: { $in: stockIds }, userDefined: true })
    //console.log(userstock)
    const result=userstock
    res.json(result)
  } catch (err) {
    res.json({ success: false, err })
  }
 
})
/*
   [정상] DIY stock 수정 : Stock {stockId:, description:null가능, price:{daily update이니까}}
*/
router.put('/custom', (req, res) => {
  //console.log('update',req.body)
  Stock.updateOne({ _id: req.body._id }, { $set: req.body.description, $push: { prices: req.body.price } }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
/*
  [정상] DIY stock 삭제&미사용 : ClassStock , Stock  { stockId: }
  - classId필요없음 custom이므로 이 Stock은 클래스 한 곳에만 종속적
*/
router.delete('/custom', async (req, res) => {
  console.log('delete', req.query)
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Class-Stock 연관 삭제 - classId필요없음
    const delclasstock = await ClassStock.deleteOne({ stockId: req.query.stockId }, { session: session });
    //console.log('del: class-stock', delclasstock);

    // 2) Stock 삭제
    const delstock = await Stock.deleteOne({ _id: req.query.stockId }, { session: session })
    //console.log('del:stock', delstock);

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
  기본 제공 stock (userDefined:false)  /default
  : programmer만 Create, Update, Delete 가능
*/
router.post("/", (req, res) => {
  const newstock = new Stock(req.body)
  newstock.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    res.status(200).json({
      success: true
    })
  })
})
module.exports = router;
