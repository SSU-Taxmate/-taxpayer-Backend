"use strict";

/* base URL
  : /api/classes
*/
var express = require("express");

var _require = require('mongoose'),
    startSession = _require.startSession,
    set = _require.set;

var _require2 = require("../models/Tax/Budget"),
    Budget = _require2.Budget;

var _require3 = require("../models/Judiciary/Fine"),
    Fine = _require3.Fine;

var _require4 = require("../models/JoinedUser"),
    JoinedUser = _require4.JoinedUser;

var _require5 = require('../models/Bank/Account'),
    Account = _require5.Account;

var _require6 = require('../models/Bank/AccountTransaction'),
    AccountTransaction = _require6.AccountTransaction;

var router = express.Router();
/* moongoose로 서버와 데이터베이스 연결 */

/*
  [정상] class 생성
*/

router.post("/", function (req, res) {
  var fine = new Fine(req.body);
  fine.save(function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
});
router.get("/", function _callee2(req, res) {
  var classid, fines, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          classid = req.query.classId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Fine.find({
            classId: classid
          }).populate("studentId").populate("lawReason"));

        case 4:
          fines = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Promise.all(fines.map(function _callee(v, i) {
            var student;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(JoinedUser.findOne({
                      _id: v.studentId
                    }).populate("userId"));

                  case 2:
                    student = _context.sent;
                    console.log(v.studentId);
                    return _context.abrupt("return", {
                      _id: v._id,
                      studentId: v.studentId,
                      studentId_id: student.userId._id,
                      name: student.userId.name,
                      Amount: v.Amount,
                      isPayed: v.isPayed,
                      lawReason: v.lawReason.title
                    });

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 7:
          result = _context2.sent;
          res.json(result);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            error: _context2.t0
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.put("/", function _callee3(req, res) {
  var session, account, pay, payfine;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(startSession());

        case 2:
          session = _context3.sent;
          _context3.prev = 3;
          session.startTransaction(); // 트랜젝션 시작

          Amount = req.body.Amount;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: req.body.studentId._id
          }).exec({
            session: session
          }));

        case 8:
          account = _context3.sent;

          if (!(account.currentBalance > Amount)) {
            _context3.next = 31;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(Fine.updateOne({
            _id: req.body._id
          }, {
            $set: {
              isPayed: 'true'
            }
          }).exec({
            session: session
          }));

        case 12:
          fine = _context3.sent;
          _context3.next = 15;
          return regeneratorRuntime.awrap(Account.updateOne({
            _id: account._id
          }, {
            $inc: {
              currentBalance: -Amount
            }
          }, {
            session: session
          }));

        case 15:
          pay = _context3.sent;
          payfine = new AccountTransaction({
            accountId: account._id,
            transactionType: 0,
            amount: Amount,
            memo: '벌금납부',
            afterbalance: account.currentBalance - Amount
          });
          _context3.next = 19;
          return regeneratorRuntime.awrap(payfine.save({
            session: session
          }));

        case 19:
          _context3.next = 21;
          return regeneratorRuntime.awrap(Budget.findOne({
            classId: req.body.studentId.classId
          }).exec({
            session: session
          }));

        case 21:
          bugget2 = _context3.sent;
          _context3.next = 24;
          return regeneratorRuntime.awrap(Budget.updateOne({
            classId: req.body.studentId.classId
          }, {
            $inc: {
              "balance.fine": +Amount
            }
          }).exec({
            session: session
          }));

        case 24:
          bugget = _context3.sent;
          _context3.next = 27;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 27:
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context3.next = 32;
          break;

        case 31:
          throw '잔액부족';

        case 32:
          _context3.next = 40;
          break;

        case 34:
          _context3.prev = 34;
          _context3.t0 = _context3["catch"](3);
          _context3.next = 38;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 38:
          session.endSession();
          res.json({
            success: false,
            err: _context3.t0
          });

        case 40:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 34]]);
});
module.exports = router;