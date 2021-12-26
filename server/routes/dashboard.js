/* base URL
  : /api/dashboard
*/
const express = require("express");
const { startSession } = require("mongoose");
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { JoinDeposit } = require("../models/Bank/JoinDeposit");
const { Stock, ClassStock } = require('../models/Stock/Stock')
const { Tax } = require('../models/Tax/Tax')
const { StockAccount } = require('../models/Stock/StockAccount')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();
/*
    BankPanel
*/
router.get('/bank', async (req, res) => {
    const studentId = req.query.studentId
    try {
        // 1.계좌 잔액
        const account = await Account.findOne({ studentId: studentId })

        // 2. 이번달 수입
        const thismonth = await AccountTransaction.aggregate([
            {
                $match: {
                    accountId: account._id,
                    transactionType: 1,//입금
                },
            },
            {
                $group:
                {
                    _id: {//월
                        $month: { date: '$date', timezone: 'Asia/Seoul' },//group by multiple&timezone
                    },
                    sum: { $sum: '$amount' }
                }
            },
        ])
        //이번달꺼만 사용하기
        if (thismonth.length === 0) {
            income = { exist: false }
        } else {
            income = { income: thismonth, exist: true }
        }
        // 3. 예금
        let deposit = await JoinDeposit.aggregate([
            {
                $match: {
                    studentId: ObjectId(studentId),
                    isClosed: false
                }
            },
            {
                $lookup: {
                    from: 'deposits',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            }
        ])

        if (deposit.length === 0) {
            deposit = { exist: false }
        }
        else {
            const createdAt = deposit[0].createdAt
            const duration = deposit[0].product.minDuration
            deposit = { exist: true, createdAt, duration }
        }
        const result = { balance: account.currentBalance, income: income, deposit: deposit }
        console.log(result)
        res.json(result)
    } catch (err) {
        res.json({ success: false, err })
    }


})

/*
    StockPanel - 오늘의 뉴스
*/
router.get('/stock/news', async (req, res) => {
    const classId = req.query.classId
    try {
        // 1. 오늘의 뉴스
        const classstock = await ClassStock.find({ classId: classId }, "stockId")
        let stocks = []
        for (let i = 0; i < classstock.length; i++) {
            stocks.push(classstock[i].stockId)
        }
        const now = new Date()//오늘0시 : new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const hint = await Stock.aggregate([
            {
                $match: {
                    '_id': { $in: stocks }
                }
            },
            {
                $project: {
                    prices: 1
                }
            },
            {
                $unwind: '$prices'
            },
            {
                $match: {
                    'prices.updateDate': {
                        $lte: new Date(now.getFullYear(), now.getMonth(), now.getDate())
                    }

                }
            },
            {
                $sort: {
                    'prices.updateDate': -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    prices: {
                        $push: '$prices'
                    }
                }
            }
        ])
        res.json(hint)

    } catch (err) {
        res.status(500).json({ error: err });
    }
})
/*
    [student]StockPanel - 수익률/등락률
*/
router.get('/stock/rate', async (req, res) => {
    const classId = req.query.classId
    const studentId = req.query.studentId
    try {

        // 2. 수익률, 등락률
        const tax = await Tax.findOne({ classId: classId })
        const stocktax = tax.taxlist.stock//stock에 붙는 tax
        const userStocks = await StockAccount.findOne({ studentId: studentId })
        const holdingStocks = userStocks.holdingStocks
        if (holdingStocks.length === 0) {//학생이 보유한 stock이 없다면
            res.json({ evaluatedProfit:'---', fluctuation:'---' })
        } else {
            let first = await Promise.all(
                holdingStocks.map(async (v, i) => {
                    const temp = await Stock.aggregate([
                        {
                            $match: {
                                '_id': v.stockId
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
                    ])
                    const stock = temp[0]//prices가 정렬되어 나옴

                    const now = new Date()
                    const isSameDate = (v) => v.updateDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate())
                    const index = stock.prices.findIndex(isSameDate)
                    let frate;
                    if (index + 1 >= stock.prices.length) {//이전값이 없어서 등락률비교불가
                        frate = 0
                    } else {
                        if (stock.prices[index + 1].value === 0) {
                            frate = 0
                        } else {
                            frate = Math.round((stock.prices[index].value - stock.prices[index + 1].value) / stock.prices[index + 1].value * 100)
                        }
                    }
                    return {
                        stockId: v._id,
                        fluctuation: frate,//등락률
                        PayAmount: v.allPayAmount,//총매입
                        evaluated: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100),//총 평가금액:현재가*잔고*(100-세금)/100
                        evaluatedIncome: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100) - v.allPayAmount//총 평가손익:총평가금액-총매입
                    }
                })
            )
            let allPayAmount = await first.reduce((v, c) => v + c.PayAmount, 0)//총매입
            let allEvaluated = await first.reduce((v, c) => v + c.evaluated, 0)//총평가
            let evaluatedIncome = allEvaluated - allPayAmount//평가손익
            let fluct = await first.reduce((v, c) => v + c.fluctuation, 0)
            let evaluatedProfit = allPayAmount === 0 ? 0 : await Math.round(evaluatedIncome / allPayAmount * 100) / 100//평가수익률
            let fluctuation =  Math.round(fluct / first.length)//평균 등락률
            res.json({evaluatedProfit, fluctuation })
        }

    } catch (err) {
        res.status(500).json({ error: err });
    }
})
module.exports = router;
