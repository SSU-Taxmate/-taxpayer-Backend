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
  [정상] Class에서 사용하는 Stock GET : 오늘 날짜까지만, prices 정보 가져오기
*/
router.get('/', async (req, res) => {
  try {
    const classstock = await ClassStock.find(req.query, "stockId")
    //console.log(req.query, classstock)
    let stocks = []
    for (let i = 0; i < classstock.length; i++) {
      stocks.push(classstock[i].stockId)
    }
    //console.log(stocks)
    const stock = await Stock.find({ _id: { $in: stocks } })
    //console.log(stock)
    let result = await Promise.all(
      stock.map(async (v, i) => {
        v.prices = await v.prices.filter(price => price.updateDate < new Date());
        return v
      })
    )

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err });
  }
})
/*
  [정상] Class에서 사용하는 Stock 에 대한 통계정보
*/
router.get('/statistics', async (req, res) => {
  console.log(req.query)
  const classId = req.query.classId
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  try {
    const classstock = await ClassStock.find({ classId: classId }, "stockId")
    let stocks = []
    for (let i = 0; i < classstock.length; i++) {
      stocks.push(classstock[i].stockId)
    }
    //클래스내 stockId
    const buyhistory = await StockOrderHistory.aggregate([
      {
        $match: {
          'stockId': { $in: stocks },
          "createdAt": { $gte: new Date(startDate), $lt: new Date(endDate) }
        }
      },
      {
        $group:
        {
          _id: '$stockId',
          count: { $sum: 1 },
          allquantity: { $sum: '$quantity' },
          allpayAmount: { $sum: '$payAmount' }
        }
      },
      {
        $lookup: {
          from: "stocks",
          localField: "_id",
          foreignField: "_id",
          as: 'stock'
        }
      },
      {
        $unwind: '$stock',
      },
      /*{
        $project:{count:1,allquantity:1,allpayAmount:1,'stock.stockName':1}
      }*/

    ])
    //console.log('>>>>>>>>>>>',buyhistory)
    res.json(buyhistory)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
})
/*
  [정상] Class에서 사용하는 Stock GET :모든 날짜
*/
router.get('/manage', async (req, res) => {
  try {
    const classstock = await ClassStock.find(req.query, "stockId")
    //console.log(req.query, classstock)
    let stocks = []
    for (let i = 0; i < classstock.length; i++) {
      stocks.push(classstock[i].stockId)
    }
    //console.log(stocks)
    const stock = await Stock.find({ _id: { $in: stocks } })
    res.json(stock)

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err });
  }
})
/*
  [정상] stock 생성&사용 
  : Stock, ClassStock body-{stockInfo:{userDefined:true필수},classId:}필수
*/
router.post("/", async (req, res) => {
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
   [정상] DIY stock 수정 : Stock {stockId:, description:null가능, price:{daily update이니까}}
*/
router.put('/', (req, res) => {
  //console.log('update',req.body)
  Stock.updateOne({ _id: req.body._id }, { $push: { prices: { hint: req.body.description, value: req.body.price, updateDate: req.body.updateDate } } }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
/*
  [정상]  stock 삭제&미사용 : ClassStock , Stock  { stockId: }

*/
router.delete('/:id', async (req, res) => {
  //console.log('delete', req.params)
  const stockId = req.params.id
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Class-Stock 연관 삭제 - classId필요없음
    const delclasstock = await ClassStock.deleteOne({ stockId: stockId }, { session: session });
    //console.log('del: class-stock', delclasstock);

    // 2) Stock 삭제
    const delstock = await Stock.deleteOne({ _id: stockId }, { session: session })
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
  [90%완료] 주식 주문
  : 학생의 Stock 매수/매도 req.params orderType로 구분
  매도 - tax 아직 안함
 */
router.post('/:id/orders', async (req, res) => {
  const stockId = req.params.id //어떤 stock을
  const orderType = req.body.orderType//매수,매도
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
      //console.log(stockaccount.holdingStocks[index].quantity)
      
      if (index > -1 && quantity <= stockaccount.holdingStocks[index].quantity) {
        //매도
        const minusStock = await StockAccount.updateOne({ studentId: studentId },
          {
            $inc: {
              [`holdingStocks.${index}.quantity`]: - quantity,
              [`holdingStocks.${index}.allPayAmount`]: - currentPrice * quantity
            }
          }
          , { session })
        const pullStock = await StockAccount.updateOne({ studentId: studentId },
          {
            $pull:{
              holdingStocks:{quantity:0}//수량없는 경우
            }
          },{session})
        //은행 (입금)
        const minus = await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: currentPrice * quantity } }, { session })
        // 은행 거래 데이터 추가
        const transfer = new AccountTransaction({
          accountId: account._id,
          transactionType: 1,
          amount: currentPrice * quantity,
          memo: '주식매도',
          afterbalance: account.currentBalance + currentPrice * quantity
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
