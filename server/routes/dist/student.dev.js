"use strict";

/* base URL
  : /api/students
*/
var express = require("express");

var router = express.Router();

var _require = require('../models/Bank/Account'),
    Account = _require.Account;

var _require2 = require('../models/Bank/AccountTransaction'),
    AccountTransaction = _require2.AccountTransaction;

var _require3 = require('../models/JoinedUser'),
    JoinedUser = _require3.JoinedUser;

var _require4 = require('../models/Bank/JoinDeposit'),
    JoinDeposit = _require4.JoinDeposit;

var _require5 = require('../models/Stock/StockAccount'),
    StockAccount = _require5.StockAccount;

var _require6 = require('../models/Stock/Stock'),
    Stock = _require6.Stock;

var _require7 = require('../models/Tax/Tax'),
    Tax = _require7.Tax;
/*
  [완료] 클래스 내 학생에 대한 모든 정보 - 학생 관리 테이블
  query{classId:} 로 class에 속한 학생의 userId, studentId는 아는 상황
*/


router.get("/", function _callee2(req, res) {
  var students, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(JoinedUser.find(req.query, ["userId", "alias", "jobId"]).populate("userId", "email name alias jobId").populate("jobId").exec());

        case 3:
          students = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Promise.all(students.map(function _callee(v, i) {
            var account;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Account.findOne({
                      studentId: v._id
                    }));

                  case 2:
                    account = _context.sent;
                    return _context.abrupt("return", {
                      studentId: v._id,
                      //user
                      name: v.userId.name,
                      email: v.userId.email,
                      alias: v.alias,
                      job: v.jobId,
                      balance: account.currentBalance
                    });

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 6:
          result = _context2.sent;
          res.json(result);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            error: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
/*
  [완료] 클래스 내 학생에 대한 job 정보 - job 테이블
  query{classId:} 로 class에 속한 학생의 userId, studentId는 아는 상황
*/

router.get("/job", function _callee4(req, res) {
  var students, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(JoinedUser.find(req.query, ["userId", "jobId"]).populate("userId").populate("jobId").exec());

        case 3:
          students = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Promise.all(students.map(function _callee3(v, i) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", {
                      studentId: v.userId._id,
                      name: v.userId.name,
                      job: v.jobId
                    });

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          })));

        case 6:
          result = _context4.sent;
          res.json(result);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            error: _context4.t0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
/*
  [완료] 클래스 내 한 학생의 직업 지원 
  : 이미 가지고 있는 직업에 apply 안됨
*/

router.post("/:id/jobs/:jobId", function (req, res) {
  var studentId = req.params.id;
  var jobId = req.params.jobId;
  JoinedUser.updateOne({
    _id: studentId,
    jobId: {
      $ne: jobId
    }
  }, {
    $addToSet: {
      jobId: jobId
    }
  }, function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
/*
  [] 클래스 내 한 학생의 직업 현황
 */

router.get('/:id/jobs', function (req, res) {
  var studentId = req.params.id;
  JoinedUser.findOne({
    _id: studentId
  }).populate('jobId').exec(function (err, doc) {
    var result = {
      Job: doc.jobId,
      studentId: studentId
    };
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/* 
   [완료] 클래스 내 한 학생의 job 삭제
*/

router["delete"]("/:id/jobs/:jobId", function (req, res) {
  var studentId = req.params.id;
  var jobId = req.params.jobId;
  JoinedUser.updateOne({
    _id: studentId
  }, {
    $pull: {
      jobId: jobId
    }
  }, function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
/*
  ====================== 계좌 정보, 거래 내역
*/

/*
  [정상] : 학생 자신의 기본 계좌 정보 가져오기
  : accountId 모르지만, studentId는 아는 상황
*/

router.get("/:id/account", function (req, res) {
  Account.findOne({
    studentId: req.params.id
  }, function (err, doc) {
    var result = doc;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [정상] : 학생 자신의 계좌 거래 내역보기
  {accountId:,startDate:,endDate:} <=studentId로 Account에서 찾을 수 있음
*/

router.get('/:id/account/history', function _callee5(req, res) {
  var startDate, endDate, account, accounttrans, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          startDate = req.query.startDate;
          endDate = req.query.endDate;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: req.params.id
          }));

        case 5:
          account = _context5.sent;
          _context5.next = 8;
          return regeneratorRuntime.awrap(AccountTransaction.find({
            accountId: account._id,
            date: {
              $gte: startDate,
              $lte: endDate
            }
          }).sort({
            date: -1
          }));

        case 8:
          accounttrans = _context5.sent;
          result = accounttrans; //console.log(result)

          res.json(result);
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json({
            success: false,
            error: _context5.t0
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
/*
    [*정상]자신 계좌의 통계정보 확인
    : 입/출금
*/

router.get('/:id/account/statistics', function _callee6(req, res) {
  var startDate, endDate, stats, studentId, account, result, bytype, bydatein, bydateout;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          startDate = req.query.startDate;
          endDate = req.query.endDate;
          stats = req.query.type; //console.log('>',stats,startDate,endDate)

          _context6.prev = 3;
          studentId = req.params.id;
          _context6.next = 7;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: studentId
          }));

        case 7:
          account = _context6.sent;

          if (!(stats === 'bytype')) {
            _context6.next = 15;
            break;
          }

          _context6.next = 11;
          return regeneratorRuntime.awrap(AccountTransaction.aggregate([{
            $match: {
              "accountId": account._id,
              "date": {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            }
          }, {
            $group: {
              _id: '$memo',
              count: {
                $sum: 1
              },
              sum: {
                $sum: '$amount'
              }
            }
          }]));

        case 11:
          bytype = _context6.sent;
          result = bytype;
          _context6.next = 22;
          break;

        case 15:
          _context6.next = 17;
          return regeneratorRuntime.awrap(AccountTransaction.aggregate([{
            $match: {
              "accountId": account._id,
              'transactionType': 1,
              //입금
              "date": {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            }
          }, {
            $group: {
              _id: {
                $dayOfWeek: {
                  date: "$date",
                  timezone: 'Asia/Seoul'
                }
              },
              //월단위 {$substr:['$date',5,2]}
              sum: {
                $sum: '$amount'
              }
            }
          }]));

        case 17:
          bydatein = _context6.sent;
          _context6.next = 20;
          return regeneratorRuntime.awrap(AccountTransaction.aggregate([{
            $match: {
              "accountId": account._id,
              'transactionType': 0,
              //출금
              "date": {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            }
          }, {
            $group: {
              _id: {
                $dayOfWeek: {
                  date: "$date",
                  timezone: 'Asia/Seoul'
                }
              },
              //월단위 {$substr:['$date',5,2]}
              sum: {
                $sum: '$amount'
              }
            }
          }]));

        case 20:
          bydateout = _context6.sent;
          result = {
            bydatein: bydatein,
            bydateout: bydateout
          };

        case 22:
          res.json(result);
          _context6.next = 28;
          break;

        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](3);
          res.status(500).json({
            success: false,
            error: _context6.t0
          });

        case 28:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 25]]);
});
/*
  ====================== 가입한 금융 상품
*/

/*
  [정상] : 가입한 상품 보여주세요 {studentId:}
  isClosed : false인 것만!
*/

router.get("/:id/deposit", function (req, res) {
  //console.log("studentId:", req.params.id)
  var studentId = req.params.id;
  JoinDeposit.findOne({
    studentId: studentId,
    isClosed: false
  }, ["productId", "amount", "createdAt"]).populate("productId").exec(function (err, data) {
    var result = data; //console.log("get:/students/deposit",result)

    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
    [정상]student가 구매한 모든 stock 보여주기
    : ByStudentStock이 이거 사용중
*/

router.get('/:id/stocks', function _callee8(req, res) {
  var studentId, classId, tax, stocktax, userStocks, holdingStocks, result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          studentId = req.params.id;
          classId = req.query.classId;
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(Tax.findOne({
            classId: classId
          }));

        case 5:
          tax = _context8.sent;
          stocktax = tax.taxlist.stock; //stock에 붙는 tax

          _context8.next = 9;
          return regeneratorRuntime.awrap(StockAccount.findOne({
            studentId: studentId
          }));

        case 9:
          userStocks = _context8.sent;
          holdingStocks = userStocks.holdingStocks;
          _context8.next = 13;
          return regeneratorRuntime.awrap(Promise.all(holdingStocks.map(function _callee7(v, i) {
            var temp, stock, now, isSameDate, index;
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(Stock.aggregate([{
                      $match: {
                        '_id': v.stockId
                      }
                    }, {
                      $unwind: '$prices'
                    }, {
                      $sort: {
                        'prices.updateDate': -1
                      }
                    }, {
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
                    }]));

                  case 2:
                    temp = _context7.sent;
                    stock = temp[0];
                    now = new Date();

                    isSameDate = function isSameDate(v) {
                      return v.updateDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    };

                    index = stock.prices.findIndex(isSameDate);
                    return _context7.abrupt("return", {
                      stockId: v.stockId,
                      quantity: v.quantity,
                      //잔고
                      allPayAmount: v.allPayAmount,
                      //매입가
                      evaluated: Math.round(v.quantity * stock.prices[index].value),
                      //평가금액:잔고*현재가
                      gainNloss: Math.round(v.quantity * stock.prices[index].value * (100 - stocktax) / 100) - v.allPayAmount,
                      //평가손익:추정자산-총매입
                      stockName: stock.stockName,
                      currentPrice: stock.prices[index].value //현재가

                    });

                  case 8:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          })));

        case 13:
          result = _context8.sent;
          //console.log('result',result)
          res.json(result);
          _context8.next = 20;
          break;

        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](2);
          res.json({
            success: false,
            err: _context8.t0
          });

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 17]]);
});
/*
    [정상]stuent 가 구매한 stock들에 대한 통계정보
*/

router.get('/:id/stocks/statistics', function _callee10(req, res) {
  var studentId, classId, tax, stocktax, userStocks, holdingStocks, first, allPayAmount, allEvaluated, allestimatedAssets, evaluatedIncome, evaluatedProfit;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          // console.log('/stocks/statistics', req.params)
          studentId = req.params.id;
          classId = req.query.classId;
          _context10.prev = 2;
          _context10.next = 5;
          return regeneratorRuntime.awrap(Tax.findOne({
            classId: classId
          }));

        case 5:
          tax = _context10.sent;
          stocktax = tax.taxlist.stock; //stock에 붙는 tax

          _context10.next = 9;
          return regeneratorRuntime.awrap(StockAccount.findOne({
            studentId: studentId
          }));

        case 9:
          userStocks = _context10.sent;
          holdingStocks = userStocks.holdingStocks;
          _context10.next = 13;
          return regeneratorRuntime.awrap(Promise.all(holdingStocks.map(function _callee9(v, i) {
            var temp, stock, now, isSameDate, index;
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(Stock.aggregate([{
                      $match: {
                        '_id': v.stockId
                      }
                    }, {
                      $unwind: '$prices'
                    }, {
                      $sort: {
                        'prices.updateDate': -1
                      }
                    }, {
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
                    }]));

                  case 2:
                    temp = _context9.sent;
                    stock = temp[0]; //console.log('>?aggregate?',stock)

                    now = new Date();

                    isSameDate = function isSameDate(v) {
                      return v.updateDate <= new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    };

                    index = stock.prices.findIndex(isSameDate); //console.log('statistics:',index)

                    return _context9.abrupt("return", {
                      stockId: v._id,
                      PayAmount: v.allPayAmount,
                      //총매입
                      estimatedAssets: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100),
                      //추정자산:세금제외
                      evaluated: Math.round(stock.prices[index].value * v.quantity),
                      //총 평가금액:현재가*잔고
                      evaluatedIncome: Math.round(stock.prices[index].value * v.quantity * (100 - stocktax) / 100) - v.allPayAmount //총 평가손익:추정자산-총매입

                    });

                  case 8:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          })));

        case 13:
          first = _context10.sent;
          _context10.next = 16;
          return regeneratorRuntime.awrap(first.reduce(function (v, c) {
            return v + c.PayAmount;
          }, 0));

        case 16:
          allPayAmount = _context10.sent;
          _context10.next = 19;
          return regeneratorRuntime.awrap(first.reduce(function (v, c) {
            return v + c.evaluated;
          }, 0));

        case 19:
          allEvaluated = _context10.sent;
          _context10.next = 22;
          return regeneratorRuntime.awrap(first.reduce(function (v, c) {
            return v + c.estimatedAssets;
          }, 0));

        case 22:
          allestimatedAssets = _context10.sent;
          //추정자산
          evaluatedIncome = allestimatedAssets - allPayAmount; //평가손익=추정자산-총매입

          if (!(allPayAmount === 0)) {
            _context10.next = 28;
            break;
          }

          _context10.t0 = 0;
          _context10.next = 31;
          break;

        case 28:
          _context10.next = 30;
          return regeneratorRuntime.awrap(Math.round(evaluatedIncome / allPayAmount * 100));

        case 30:
          _context10.t0 = _context10.sent;

        case 31:
          evaluatedProfit = _context10.t0;
          //평가수익률

          /*
          {
              allPay:,//총매입
              allEvaluated:,//총평가 //currentPrice*quantity를 다더하기
              evaluatedIncome:,평가손익 추정자산-총매입(투자총액)
              evaluatedProfit:,평가수익률//평가손익/총매입*100
          }
          */
          res.json({
            allPay: allPayAmount,
            //총매입
            allEvaluated: allEvaluated,
            //총 평가 금액
            allestimatedAssets: allestimatedAssets,
            //총 추정자산
            evaluatedIncome: evaluatedIncome,
            //총 평가 손익
            evaluatedProfit: evaluatedProfit //평가 수익률

          });
          _context10.next = 38;
          break;

        case 35:
          _context10.prev = 35;
          _context10.t1 = _context10["catch"](2);
          res.json({
            success: false,
            err: _context10.t1
          });

        case 38:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[2, 35]]);
});
module.exports = router;