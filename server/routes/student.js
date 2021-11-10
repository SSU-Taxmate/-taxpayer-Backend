/* base URL
  : /api/students
*/
const express = require("express");
const router = express.Router();

const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { JoinedUser } = require('../models/JoinedUser');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');
const { StockAccount } = require('../models/Stock/StockAccount');
const { Stock } = require('../models/Stock/Stock');
const { Tax } = require('../models/Tax/Tax')
    /*
      [완료] 클래스 내 학생에 대한 모든 정보 - 학생 관리 테이블
      query{classId:} 로 class에 속한 학생의 userId, studentId는 아는 상황
    */
router.get("/", async(req, res) => {
    try {
        const students = await JoinedUser.find(req.query, [
                "userId",
                "alias",
                "jobId",
            ])
            .populate("userId", "email name alias jobId")
            .populate("jobId")
            .exec();
        let result = await Promise.all(
            students.map(async(v, i) => {
                const account = await Account.findOne({ studentId: v._id });
                return {
                    studentId: v._id, //user
                    name: v.userId.name,
                    email: v.userId.email,
                    alias: v.alias,
                    job: v.jobId,
                    balance: account.currentBalance,
                };
            })
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
});

/*
  [완료] 클래스 내 학생에 대한 job 정보 - job 테이블
  query{classId:} 로 class에 속한 학생의 userId, studentId는 아는 상황
*/
router.get("/job", async(req, res) => {
    try {
        const students = await JoinedUser.find(req.query, ["userId", "jobId"])
            .populate("userId")
            .populate("jobId")
            .exec();
        let result = await Promise.all(
            students.map(async(v, i) => {
                return {
                    studentId: v.userId._id,
                    name: v.userId.name,
                    job: v.jobId,
                };
            })
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
});
/*
  [완료] 클래스 내 한 학생의 직업 지원 
  : 이미 가지고 있는 직업에 apply 안됨
*/
router.post("/:id/jobs/:jobId", (req, res) => {
    const studentId = req.params.id;
    const jobId = req.params.jobId;

    JoinedUser.updateOne({ _id: studentId, jobId: { $ne: jobId } }, { $addToSet: { jobId: jobId } }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
});
/*
  [] 클래스 내 한 학생의 직업 현황
 */
router.get('/:id/jobs', (req, res) => {
    const studentId = req.params.id

    JoinedUser.findOne({ _id: studentId }).populate('jobId').exec((err, doc) => {
        const result = { Job: doc.jobId, studentId: studentId };

        if (err) return res.status(500).json({ error: err });
        res.json(result);
    })


})

/* 
   [완료] 클래스 내 한 학생의 job 삭제
*/
router.delete("/:id/jobs/:jobId", (req, res) => {
    const studentId = req.params.id;
    const jobId = req.params.jobId;
    JoinedUser.updateOne({ _id: studentId }, { $pull: { jobId: jobId } },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
            });
        }
    );
});

/*
  ====================== 계좌 정보, 거래 내역
*/
/*
  [정상] : 학생 자신의 기본 계좌 정보 가져오기
  : accountId 모르지만, studentId는 아는 상황
*/
router.get("/:id/account", (req, res) => {
    Account.findOne({ studentId: req.params.id }, (err, doc) => {
        const result = doc;
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});
/*
  [정상] : 학생 자신의 계좌 거래 내역보기
  {accountId:,startDate:,endDate:} <=studentId로 Account에서 찾을 수 있음
*/

router.get('/:id/account/history', async(req, res) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    try {
        const account = await Account.findOne({ studentId: req.params.id })
        const accounttrans = await AccountTransaction.find({
            accountId: account._id,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: -1 })
        const result = accounttrans
            //console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }

})

/*
    [*정상]자신 계좌의 통계정보 확인
    : 입/출금
*/

router.get('/:id/account/statistics', async(req, res) => {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const stats = req.query.type
        //console.log('>',stats,startDate,endDate)
    try {
        const studentId = req.params.id
        const account = await Account.findOne({ studentId: studentId })
            //console.log(account)
        let result;
        if (stats === 'bytype') {
            const bytype = await AccountTransaction.aggregate([{
                    $match: {
                        "accountId": account._id,
                        "date": { $gte: new Date(startDate), $lte: new Date(endDate) }
                    }
                },
                {
                    $group: {
                        _id: '$memo',
                        count: { $sum: 1 },
                        sum: { $sum: '$amount' }
                    }
                }
            ])
            result = bytype
        } else {
            const bydatein = await AccountTransaction.aggregate([{
                    $match: {
                        "accountId": account._id,
                        'transactionType': 1, //입금
                        "date": { $gte: new Date(startDate), $lte: new Date(endDate) }
                    },

                },
                {
                    $group: {
                        _id: { $dayOfWeek: { date: "$date", timezone: 'Asia/Seoul' } }, //월단위 {$substr:['$date',5,2]}
                        sum: { $sum: '$amount' }
                    }
                }
            ])
            const bydateout = await AccountTransaction.aggregate([{
                    $match: {
                        "accountId": account._id,
                        'transactionType': 0, //출금
                        "date": { $gte: new Date(startDate), $lte: new Date(endDate) }
                    },

                },
                {
                    $group: {
                        _id: { $dayOfWeek: { date: "$date", timezone: 'Asia/Seoul' } }, //월단위 {$substr:['$date',5,2]}
                        sum: { $sum: '$amount' }
                    }
                }
            ])
            result = { bydatein, bydateout }
        }
        res.json(result)
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }

});

/*
  ====================== 가입한 금융 상품
*/
/*
  [정상] : 가입한 상품 보여주세요 {studentId:}
  isClosed : false인 것만!
*/
router.get("/:id/deposit", (req, res) => {
    //console.log("studentId:", req.params.id)
    const studentId = req.params.id;
    JoinDeposit.findOne({ studentId: studentId, isClosed: false }, [
            "productId",
            "amount",
            "createdAt",
        ])
        .populate("productId")
        .exec((err, data) => {
            const result = data;
            //console.log("get:/students/deposit",result)
            if (err) return res.status(500).json({ error: err });
            res.json(result);
        });
});

/*
    [정상]student가 구매한 모든 stock 보여주기
    : ByStudentStock이 이거 사용중
*/

router.get('/:id/stocks', async(req, res) => {
        const studentId = req.params.id;
        const classId = req.query.classId;

        try {
            const tax = await Tax.findOne({ classId: classId })

            const stocktax = tax.taxlist.stock //stock에 붙는 tax
            const userStocks = await StockAccount.findOne({ studentId: studentId })
            const holdingStocks = userStocks.holdingStocks

            let result = await Promise.all(
                    holdingStocks.map(async(v, i) => {

                        const temp = await Stock.aggregate([{
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
                        const stock = temp[0]
                        const now = new Date()
                        const isSameDate = (v) => v.updateDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate())
                        const index = stock.prices.findIndex(isSameDate)

                        return {
                            stockId: v.stockId,
                            quantity: v.quantity, //잔고
                            allPayAmount: v.allPayAmount, //매입가
                            evaluated: Math.round(v.quantity * stock.prices[index].value), //평가금액:잔고*현재가
                            gainNloss: Math.round(v.quantity * stock.prices[index].value * (100 - stocktax) / 100) - v.allPayAmount, //평가손익:추정자산-총매입
                            stockName: stock.stockName,
                            currentPrice: stock.prices[index].value //현재가
                        }
                    })
                )
                //console.log('result',result)
            res.json(result)
        } catch (err) {
            res.json({ success: false, err })
        }
    })
    /*
        [정상]stuent 가 구매한 stock들에 대한 통계정보
    */

router.get('/:id/stocks/statistics', async(req, res) => {
    // console.log('/stocks/statistics', req.params)
    const studentId = req.params.id;
    const classId = req.query.classId
    try {
        const tax = await Tax.findOne({ classId: classId })
        const stocktax = tax.taxlist.stock //stock에 붙는 tax

        const userStocks = await StockAccount.findOne({ studentId: studentId })
        const holdingStocks = userStocks.holdingStocks

        let first = await Promise.all(
            holdingStocks.map(async(v, i) => {
                //const stock = await Stock.findOne({ '_id': v.stockId })
                const temp = await Stock.aggregate([{
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
                const stock = temp[0]

                //console.log('>?aggregate?',stock)
                const now = new Date()
                const isSameDate = (v) => v.updateDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate())
                const index = stock.prices.findIndex(isSameDate)
                    //console.log('statistics:',index)
                return {
                    stockId: v._id,
                    PayAmount: v.allPayAmount, //총매입
                    estimatedAssets: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100), //추정자산:세금제외
                    evaluated: Math.round(stock.prices[index].value * v.quantity), //총 평가금액:현재가*잔고
                    evaluatedIncome: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100) - v.allPayAmount //총 평가손익:추정자산-총매입
                }
            })
        )
        let allPayAmount = await first.reduce((v, c) => v + c.PayAmount, 0) //총매입
        let allEvaluated = await first.reduce((v, c) => v + c.evaluated, 0) //총 평가금액
        let allestimatedAssets = await first.reduce((v, c) => v + c.estimatedAssets, 0) //추정자산
        let evaluatedIncome = allestimatedAssets - allPayAmount //평가손익=추정자산-총매입
        let evaluatedProfit = allPayAmount === 0 ? 0 : await Math.round(evaluatedIncome / allPayAmount * 100) //평가수익률
            /*
            {
                allPay:,//총매입
                allEvaluated:,//총평가 //currentPrice*quantity를 다더하기
                evaluatedIncome:,평가손익 추정자산-총매입(투자총액)
                evaluatedProfit:,평가수익률//평가손익/총매입*100
            }
            */
        res.json({
            allPay: allPayAmount, //총매입
            allEvaluated, //총 평가 금액
            allestimatedAssets, //총 추정자산
            evaluatedIncome, //총 평가 손익
            evaluatedProfit, //평가 수익률
        });
    } catch (err) {
        res.json({ success: false, err });
    }
});
module.exports = router;