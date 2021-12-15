/* base URL
    : /api/students
*/
const express = require("express");
const router = express.Router();
const moment=require('moment-timezone')
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const { JoinedUser } = require('../models/JoinedUser');
const { JoinDeposit } = require('../models/Bank/JoinDeposit');
const { StockAccount } = require('../models/Stock/StockAccount');
const { Stock } = require('../models/Stock/Stock');
const { Tax } = require('../models/Tax/Tax')
const {Contract}=require('../models/Job/Contract')
const {User}=require('../models/User')
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
    클래스 내 모든 학생의 job정보
    => Contract 확인으로 변경=> 계약 기간 만료된 학생인지 확인 안함
*/
router.get("/job", async(req, res) => {
    //classId
    console.log(req.query)
    try {
        const students = await Contract.find(req.query)
            .populate("joinedUser")
            .exec();
        let result = await Promise.all(
            students.map(async(v, i) => {
                const joinedUser=v.joinedUser
                const user =await User.findOne({_id:joinedUser.userId})
                return {
                    studentId: joinedUser._id,
                    name: user.name,
                    job: v.job._id,
                };
            })
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
});

/*
    [GET] 한 학생의 만료되지 않은 계약서 = 현재 직업
 */
router.get('/:id/jobs', (req, res) => {
    const studentId = req.params.id
    Contract.findOne({ joinedUser: studentId, exp:{$gt:moment()}}).populate('jobId').exec((err, doc) => {
        const result = { Job: doc.jobId, studentId: studentId };
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    })
})
/*
    학생의 지원서 볼 수 있음
    =>
*/
router.get('/:id/appliances',(req,res)=>{
    
})
/* 
    해고=>계약서 파기하는 것으로 바꾸기
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
    ====================== 계좌 정보, 거래 내역    ===================================
*/
/*
    [GET] : 학생 자신의 기본 계좌 정보
*/
router.get("/:id/account", (req, res) => {
    Account.findOne({ studentId: req.params.id }, (err, doc) => {
        const result = doc;
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});
/*
    [GET] : 자신의 계좌 거래 내역
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
    [GET]자신 계좌의 통계정보 확인
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
    ====================== 가입한 금융 상품    ======================
*/
/*
    [get] : 본인이 가입한 상품 {studentId:}
    isClosed : false인 것만!
*/
router.get("/:id/deposit", (req, res) => {
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
    [get] 본인이 구매한 모든 stock 보여주기
    : ByStudentStock이 사용중
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
                        
                        const evaluatedvalue=v.quantity * stock.prices[index].value//평가금액:잔고*현재가
                        return {
                            stockId: v.stockId,
                            quantity: v.quantity, //잔고
                            allPayAmount: v.allPayAmount, //매입가
                            evaluated:evaluatedvalue, //평가금액
                            gainNloss: Math.round(evaluatedvalue * (100 - stocktax) / 100) - v.allPayAmount, //평가손익:추정자산-총매입
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
    [get]본인이 구매한 stock들에 대한 통계정보
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
                    //console.log('statistics:',index)
                
                const estimatedAssets=Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100)//추정자산:세금제외
                return {
                    stockId: v._id,
                    PayAmount: v.allPayAmount, //총매입
                    estimatedAssets: estimatedAssets, //추정자산
                    evaluated: stock.prices[index].value * v.quantity, //총 평가금액:현재가*잔고
                    evaluatedIncome:estimatedAssets - v.allPayAmount //총 평가손익:추정자산-총매입
                }
            })
        )
        let allPayAmount = await first.reduce((v, c) => v + c.PayAmount, 0) //총매입
        let allEvaluated = await first.reduce((v, c) => v + c.evaluated, 0) //총 평가금액
        let allestimatedAssets = await first.reduce((v, c) => v + c.estimatedAssets, 0) //추정자산
        let evaluatedIncome = allestimatedAssets - allPayAmount //평가손익=추정자산-총매입
        let evaluatedProfit = allPayAmount === 0 ? 0 : await Math.round(evaluatedIncome / allPayAmount * 100) //평가수익률
        res.json({
            allPay: allPayAmount, //총매입
            allEvaluated, //총 평가 금액 : currentPrice*quantity를 다더하기
            allestimatedAssets, //총 추정자산
            evaluatedIncome, // 평가 손익 : 추정자산-총매입(투자총액)
            evaluatedProfit, //평가 수익률 : 평가손익/총매입*100
        });
    } catch (err) {
        res.json({ success: false, err });
    }
});
module.exports = router;