/* base URL
  : /api/stocks
*/
const express = require('express');
const { startSession } = require('mongoose');
const { Stock, ClassStock } = require('../models/Stock/Stock');
const { StockAccount } = require('../models/Stock/StockAccount');
const { StockOrderHistory } = require('../models/Stock/StockOrderHistory');
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');

const router = express.Router();
/*
  [정상] Default Stock 모두 가져오기
*/
router.get('/', (req, res) => {
  Stock.find({ userDefined: false }, (err, doc) => {
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
  // console.log('create', req.body)
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Stock 생성
    const newstock = new Stock(req.body.stockInfo);
    const savestock = await newstock.save({ session });
    //console.log('savestock', savestock);

    // 2) Class-Stock 연관
    const newclass = new ClassStock({ classId: req.body.classId, stockId: newstock._id, userDefined: true });
    const sclassstock = await newclass.save({ session });
    //console.log('class-stock', sclassstock);

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
  //console.log(req.query)
  try {
    const allusestock = await ClassStock.find(req.query)
    let stockIds = []
    for (let i = 0; i < allusestock.length; i++) {
      stockIds.push(allusestock[i].stockId)
    }
    //console.log(stockIds)
    const userstock = await Stock.find({ _id: { $in: stockIds }, userDefined: true })
    //console.log(userstock)
    const result = userstock
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

  Stock.updateOne({ _id: req.body._id }, { $push: { prices: { hint: req.body.description, value: req.body.price } } }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
/*
  [정상] DIY stock 삭제&미사용 : ClassStock , Stock  { stockId: }
  - classId필요없음 custom이므로 이 Stock은 클래스 한 곳에만 종속적
  주식을 보유중인 학생이 있다면, 
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


/*
  [90%완료] 주식 주문
  : 학생의 Stock 매수/매도 req.params orderType로 구분
  매도 - tax 아직 안함
 */
router.post('/:id/orders', async (req, res) => {
  const stockId = req.params.id //어떤 stock을
  const orderType = req.query.orderType//매수,매도
  const studentId = req.body.studentId //누가
  const quantity = req.body.quantity //얼만큼
  const currentPrice = req.body.currentPrice//현재가
 // console.log(stockId, orderType, studentId, quantity)
  const session = await startSession();

  try {
    session.startTransaction();// 트랜젝션 시작
    const account = await Account.findOne({ studentId: studentId }).session(session)

    if (orderType === '매수') {
      console.log('매수')
      // 1) 은행 잔고 확인
      if (account.currentBalance >= quantity * currentPrice) {
        //2) StockOrderHistory에 구매 내역 추가
        const history = new StockOrderHistory({
          studentId: studentId,
          stockId: stockId,
          quantity: quantity,
          currentPrice: currentPrice,
          payAmount: currentPrice * quantity  //currentPrice&Tax에서 얻은 Stock필요
        })
        history.save({ session })
        //console.log(history)

        // 3) 은행 처리
        const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- history.payAmount) } }, { session })
        const transfer = new AccountTransaction({
          accountId: account._id,
          transactionType: 0,
          amount: history.payAmount,
          memo: '주식매수',
          afterbalance: account.currentBalance - history.payAmount
        })
        await transfer.save({ session })
        //console.log(transfer)

        // 4) holdingStocks 확인
        const stockaccount = await StockAccount.findOne({ studentId: studentId }).exec({ session })
        //console.log(stockaccount)
        const index = stockaccount.holdingStocks.findIndex(v => v.stockId == stockId)
        //console.log(index)
        if (index > -1) {// 4-1) 기존 stock이 있다면,
          const addStock = await StockAccount.updateOne({ studentId: studentId },
            {
              $inc: {
                [`holdingStocks.${index}.quantity`]: quantity,
                [`holdingStocks.${index}.allPayAmount`]: history.payAmount
              }
            }
            , { session })
          //console.log('yeah',addStock)

        } else {// 4-2) 기존 stock이 없다면,
          const addStock = await StockAccount.updateOne({ studentId: studentId }, {
            $push: {
              holdingStocks: {
                stockId: stockId,
                quantity: quantity,
                allPayAmount: history.payAmount
              }
            }
          }, { session })
          //console.log(addStock)
        }
      } else {
        throw '잔액 부족'
      }

    } else {
      console.log('매도')
      const stockaccount = await StockAccount.findOne({ studentId: studentId }).exec({ session })
      const index = stockaccount.holdingStocks.findIndex(v => v.stockId == stockId)
      console.log(stockaccount.holdingStocks[index].quantity)
      if (index > -1 && quantity <= stockaccount.holdingStocks[index].quantity) {
        //매도
        const minusStock = await StockAccount.updateOne({ studentId: studentId },
          {
            $inc: {
              [`holdingStocks.${index}.quantity`]: - quantity,
              [`holdingStocks.${index}.allPayAmount`]: - currentPrice*quantity
            }
          }
          , { session })
        //은행 (입금)
        const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: currentPrice*quantity } }, { session })
        // 은행 거래 데이터 추가
        const transfer = new AccountTransaction({
          accountId: account._id,
          transactionType: 1,
          amount: currentPrice*quantity,
          memo: '주식매도',
          afterbalance: account.currentBalance + currentPrice*quantity
        })
        await transfer.save({ session })
        //console.log(transfer)
      } else {
        throw '주문 수량이 매도 가능 수량보다 많습니다.'
      }
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
module.exports = router;
