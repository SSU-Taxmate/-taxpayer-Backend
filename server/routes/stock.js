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
const { Tax } = require('../models/Tax/Tax');
const { Budget } = require('../models/Tax/Budget');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment-timezone')
const router = express.Router();
/*
  [GET] 클래스에서 사용하는 모든 주식들
  조건_ 모든 주식의 가격, 뉴스 관련 정보는 오늘 날짜를 포함하여 이전의 것이다.
*/
router.get('/', async (req, res) => {
  try {
    const classstock = await ClassStock.find(req.query, "stockId")
    let stocks = []
    for (let i = 0; i < classstock.length; i++) {
      stocks.push(classstock[i].stockId)
    }
    const stock = await Stock.find({ _id: { $in: stocks } })
    const now = moment().tz('Asia/Seoul')
    
    let result = await Promise.all(
      stock.map(async (v, i) => {
        v.prices = await v.prices.filter(price => price.updateDate <= new Date(now.year(), now.month(), now.date()));
        return v
      })
    )
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err });
  }
})
/*
  [GET] 클래스에서 사용하는 모든 주식에 대한 통계정보
*/
router.get('/statistics', async (req, res) => {
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
          "createdAt": { $gte: new Date(startDate), $lte: new Date(endDate) }
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
    ])
    res.json(buyhistory)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
})
/*
  [GET] 클래스에서 사용하는 모든 주식
  선생님의 주식 설정 탭에서 사용된다.
  조건_ 모든 주식의 가격, 뉴스 관련 정보를 가져온다. (모든 날짜)
*/
router.get('/manage', async (req, res) => {
  try {
    const classstock = await ClassStock.find(req.query, "stockId")
    const stocks=classstock.map(stock=>stock.stockId)
    const stock = await Stock.find({ _id: { $in: stocks } })
    res.json(stock)
  } catch (err) {
    res.status(500).json({ error: err });
  }
})
/*
  [GET] 클래스에서 사용하는 하나의 주식 GET
  선생님의 주식 설정 탭>자세히보기에서 사용된다.
*/
router.get('/:id/manage', (req, res) => {
  const stockId = req.params.id

  Stock.aggregate([
    {
      $match: {
        '_id': ObjectId(stockId)
      }
    },
    {
      $unwind: '$prices'
    },
    {
      $sort: {
        'prices.updateDate': -1
      }
    },
    {
      $group: {
        _id: "$_id",

        description: {
          $first: "$description"
        },
        ondelete: {
          $first: '$ondelete'
        },
        ondeleteDay: {
          $first: '$ondeleteDay'
        },
        stockName: {
          $first: '$stockName'
        },
        createdAt: {
          $first: '$createdAt'
        },
        updatedAt: {
          $first: 'updatedAt'
        },
        prices: {
          $push: '$prices'
        }
      }
    }
  ]).exec((err, stock) => {
    const result = stock[0]
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [POST] 주식 생성&사용 
  : Stock, ClassStock body-{stockInfo:,classId:}필수
*/
router.post("/", async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // 1) Stock 생성
    const newstock = new Stock(req.body.stockInfo);
    await newstock.save({ session });

    // 2) Class-Stock 연관
    const relateclass = new ClassStock({ classId: req.body.classId, stockId: newstock._id });
    await relateclass.save({ session });

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

});
/*
  [POST] 주식 가격/뉴스 추가
  조건_ 같은 날짜가 있다면 안 바뀜
*/
router.post('/:id/prices', (req, res) => {
  const stockId = req.params.id
  var price = req.body
  Stock.updateOne(
    {
      _id: stockId,
      'prices.updateDate': { $ne: price.updateDate }
    },
    {
      $push: {
        prices: req.body
      }
    }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true
      })
    })
})
/*
  [put] stock prices 수정
  조건_ 미래의 날짜이면 바꿀 수 있다.
*/
router.put('/:id/prices', (req, res) => {
  const stockId = req.params.id
  const now = moment().format('YYYY-MM-DD')
  if (moment(req.body.updateDate).isSameOrBefore(now)){//과거, 현재이면 바꿀 수 없다.
    return res.status(400).json({ success: false, err:'잘못된 요청' })
  }
  Stock.updateOne(
    {
      _id: stockId,
      'prices': { $elemMatch: { updateDate: req.body.updateDate } }
    },
    {
      '$set': {
        'prices.$.value': req.body.value,
        'prices.$.hint': req.body.hint
      }
    }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true
      })
  })
})
/*
  [delete] 주식 가격/뉴스 삭제
*/
router.delete('/:id/prices/:priceId', (req, res) => {
  const stockId = req.params.id
  const priceId = req.params.priceId
  Stock.updateOne({ _id: stockId },
    {
      $pull: {
        "prices": { _id: ObjectId(priceId) }
      }
    }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true
      })
    })
})

/*
  [delete]  주식 삭제
  조건_ 보유하는 사람이 한명이라도 있을 때는 미사용으로 바꾼다.
*/
router.delete('/:id', async (req, res) => {
  const stockId = req.params.id
  const session = await startSession();
  try {
    session.startTransaction();
    const countwhohas = await StockAccount.countDocuments({ 'holdingStocks.stockId': stockId }).exec({ session })
    if (countwhohas <= 0) {//보유중인 사람이 없다면
      // 1) Class-Stock 연관 삭제
      const deleteRelation = await ClassStock.deleteOne({ stockId: stockId }, { session: session });

      // 2) Stock 삭제
      const deleteStock = await Stock.deleteOne({ _id: stockId }, { session: session })

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({
        success: true,
        message: '성공적으로 상장 폐지가 되었습니다.'
      })
    } else {//보유중인 사람이 있다면
      //1) 상장폐지 신청
      const ondelete = await Stock.updateOne({ _id: stockId }, { $set: { ondelete: true, ondeleteDay: moment().tz('Asia/Seoul').add(15,'d') } }).exec({ session })
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({
        success: true,
        message: '상장 폐지 신청이 완료되었습니다. 15일 뒤에 삭제됩니다.'
      })
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

})

/*
  [POST] 주식 주문
  : 학생의 Stock 매수/매도 req.params orderType로 구분
 */
router.post('/:id/orders', async (req, res) => {
  const stockId = req.params.id //어떤 stock을
  const orderType = req.body.orderType//매수,매도
  const studentId = req.body.studentId //누가
  const quantity = req.body.quantity //얼만큼
  const currentPrice = req.body.currentPrice//현재가
  const session = await startSession();

  try {
    session.startTransaction();// 트랜젝션 시작
    if(quantity<=0){
      throw '수량을 다시 입력해주세요'
    }
    const account = await Account.findOne({ studentId: studentId }).exec({ session })
    
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
        await history.save({ session })

        // 3) 은행 처리
        await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- history.payAmount) } }, { session })
        const transfer = new AccountTransaction({
          accountId: account._id,
          transactionType: 0,
          amount: history.payAmount,
          memo: '주식매수',
          afterbalance: account.currentBalance - history.payAmount
        })
        await transfer.save({ session })

        // 4) holdingStocks 확인
        const stockaccount = await StockAccount.findOne({ studentId: studentId }).exec({ session })
        const index = stockaccount.holdingStocks.findIndex(v => v.stockId == stockId)
        if (index > -1) {// 4-1) 기존 stock이 있다면,
          await StockAccount.updateOne({ studentId: studentId },
            {
              $inc: {
                [`holdingStocks.${index}.quantity`]: quantity,
                [`holdingStocks.${index}.allPayAmount`]: history.payAmount
              }
            }
            , { session })
          //console.log('yeah',addStock)

        } else {// 4-2) 기존 stock이 없다면,
          await StockAccount.updateOne({ studentId: studentId }, {
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
      //console.log('매도')
      const classId = req.body.classId
      const stockaccount = await StockAccount.findOne({ studentId: studentId }).exec({ session })
      const index = stockaccount.holdingStocks.findIndex(v => v.stockId == stockId)
      //console.log('매도-보유수량',quantity,stockaccount,stockaccount.holdingStocks[index].quantity)

      if (index > -1 && quantity <= stockaccount.holdingStocks[index].quantity) {//매도수량 확인
        //매도
        await StockAccount.updateOne({ studentId: studentId },
          {
            $inc: {
              [`holdingStocks.${index}.quantity`]: - quantity,
              [`holdingStocks.${index}.allPayAmount`]: - currentPrice * quantity
            }
          }
          ).exec({session})
        // 주식 보유수량:0 => 삭제
        await StockAccount.updateOne({ studentId: studentId },
          {
            $pull: {
              holdingStocks: { quantity: 0 }//수량없는 경우
            }
          }).exec({session})

        // 1. 은행 (입금)
        await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: currentPrice * quantity } }).exec({session})

        // 은행 거래 데이터 추가(입금)
        const transfer = new AccountTransaction({
          accountId: account._id,
          transactionType: 1,
          amount: currentPrice * quantity,
          memo: '주식매도',
          afterbalance: account.currentBalance + currentPrice * quantity
        })
        await transfer.save({ session })

        // 2. 세금 계산
        const tax = await Tax.findOne({ classId: classId }).exec({ session })
        const stocktax = tax.taxlist.stock
        const tax2user = Math.round(stocktax * currentPrice * quantity / 100)

        //은행 (출금)
        await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- tax2user) } }).exec({session})
        //은행 거래 데이터 추가(출금)
        const account2 = await Account.findOne({ _id: account._id }).exec({ session })

        if (tax2user > 0)  {
          const transfer2 = new AccountTransaction({
            accountId: account2._id,
            transactionType: 0,
            amount: tax2user,
            memo: '증권거래세',
            afterbalance: account2.currentBalance
          })
          await transfer2.save({ session })
        }
        // 국세청 세금에 추가
        await Budget.updateOne({ classId: classId },
          { $inc: { 'balance.stock': tax2user } }).exec({ session })

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