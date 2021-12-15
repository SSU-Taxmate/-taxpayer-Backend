"use strict";

/* base URL
  : /api/classes
*/
var express = require("express");

var _require = require("mongoose"),
    startSession = _require.startSession;

var _require2 = require("../models/Bank/Account"),
    Account = _require2.Account;

var _require3 = require("../models/Tax/Budget"),
    Budget = _require3.Budget; //const { BudgetAccount } = require('../models/Tax/BudgetAccount')


var _require4 = require("../models/Class"),
    Class = _require4.Class;

var _require5 = require("../models/JoinedUser"),
    JoinedUser = _require5.JoinedUser;

var _require6 = require("../models/Tax/Tax"),
    Tax = _require6.Tax;

var _require7 = require("../models/Stock/StockAccount"),
    StockAccount = _require7.StockAccount;

var _require8 = require("../models/Bank/AccountTransaction"),
    AccountTransaction = _require8.AccountTransaction;

var _require9 = require('../models/Judiciary/Fine'),
    Fine = _require9.Fine;

var _require10 = require('../models/Bank/JoinDeposit'),
    JoinDeposit = _require10.JoinDeposit;

var _require11 = require('../models/Stock/StockOrderHistory'),
    StockOrderHistory = _require11.StockOrderHistory;

var router = express.Router();
/*
  [정상] class 생성
*/

router.post("/", function _callee(req, res) {
  var session, Random, exClass, cClass, classres, cTax, taxres, budget, accountres;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(startSession());

        case 2:
          session = _context.sent;
          _context.prev = 3;
          session.startTransaction(); // 1) Class 생성
          // 1-1) Class 생성시 랜덤번호 부여.

          Random = Math.floor(Math.random() * 89999) + 10000; //10000~99999사이의값.

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Class.findOne({
            entrycode: Random
          }));

        case 8:
          if (!(entry_check = _context.sent)) {
            _context.next = 13;
            break;
          }

          Random = Random + 1;

          if (Random > 99999) {
            Random = 10000;
          }

          _context.next = 6;
          break;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(Class.findOne({
            name: req.body.name
          }));

        case 15:
          exClass = _context.sent;

          // 이메일 중복 확인
          if (exClass) {
            console.log('존재하는 클래스명입니다.');
            res.send('class_create_error=exist'); // return res.status(403).send('error 설명 메시지');

            next(error);
          } //클래스의 중복이름체크


          _context.next = 19;
          return regeneratorRuntime.awrap(Class.create({
            name: req.body.name,
            image: req.body.image,
            comment: req.body.comment,
            teacherId: req.body.teacherId,
            entrycode: Random
          }));

        case 19:
          cClass = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap(cClass.save({
            session: session
          }));

        case 22:
          classres = _context.sent;
          // 2) Tax default 생성
          cTax = new Tax({
            classId: cClass._id
          });
          _context.next = 26;
          return regeneratorRuntime.awrap(cTax.save({
            session: session
          }));

        case 26:
          taxres = _context.sent;
          // 3) Class Account 생성
          budget = new Budget({
            classId: cClass._id
          }); //const budgetaccount = new BudgetAccount({ classId: cClass._id })

          _context.next = 30;
          return regeneratorRuntime.awrap(budget.save({
            session: session
          }));

        case 30:
          accountres = _context.sent;
          _context.next = 33;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 33:
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context.next = 43;
          break;

        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](3);
          _context.next = 41;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 41:
          session.endSession();
          res.json({
            success: false,
            err: _context.t0
          });

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 37]]);
});
/*
  [정상] classes 불러오기
  : 학생의 경우 JoinedUser에 클래스 내의 정보가 저장된다.
    - req.query{userId:} _학생or선생님
*/

router.get("/", function (req, res) {
  if (req.query.role === "0") {
    //선생님 - Class의 teacher가 일치하는 값
    Class.find({
      teacherId: req.query.userId
    }, function (err, classes) {
      if (err) return res.status(500).json({
        error: err
      });
      res.json(classes);
    });
  } else {
    //학생- JoinedUser의 userId가 일치하는 값
    var a = function a() {
      var userclass, classIds, i, classInfo;
      return regeneratorRuntime.async(function a$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(JoinedUser.find({
                userId: req.query.userId
              }, "classId"));

            case 2:
              userclass = _context2.sent;
              classIds = [];

              for (i = 0; i < userclass.length; i++) {
                classIds.push(userclass[i].classId);
              } //학생이 속해있는 class 정보 얻음.


              _context2.next = 7;
              return regeneratorRuntime.awrap(Class.find({
                _id: {
                  $in: classIds
                }
              }));

            case 7:
              classInfo = _context2.sent;
              return _context2.abrupt("return", res.json(classInfo));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    };

    a();
  }
});
/*
  [정상] class 정보 업데이트
  : comment, image
*/

router.put("/", function (req, res) {
  Class.updateOne({
    _id: req.body._id
  }, {
    $set: req.body
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
  class 삭제 - 미완 (Cascade- 모두 합친 cascade)
  : (1) ClassId - Tax, Stock, Homework 모두 삭제
    (2) ClassId - Class 삭제
    - req.query{classId:}
*/

router["delete"]("/:id", function _callee2(req, res) {
  var classId, session;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          /*role확인*/
          classId = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(startSession());

        case 3:
          session = _context3.sent;
          _context3.prev = 4;
          session.startTransaction(); //(1) tax에서 TaxId 확인 및 Tax에서 삭제
          //(2) stock에서 StockId 확인 및 Stock에서 삭제
          //(3) homework
          //(4) classId에 해당하는 Class 삭제

          _context3.next = 8;
          return regeneratorRuntime.awrap(Class.find({
            _id: classId
          }).deleteOne().session({
            session: session
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 10:
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context3.next = 20;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](4);
          _context3.next = 18;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 18:
          session.endSession();
          res.json({
            success: false,
            err: _context3.t0
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 14]]);
});
/*
  [정상] Class에 Join하기 위한 목적
  : 학생이 참가코드입력 - 이미 가입 되어 있다면 가입 되어있다고 메시지 보내기
*/
// transaction이 필요한지는 조금 더 고민해보자

router.post('/join', function _callee3(req, res) {
  var entrycode, userId, session, classInfo, already, cjoineduser, savejoineduser, caccount, saveaccount, saccount, savesaccount;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('/classes/join', req.body);
          entrycode = req.body.entrycode;
          userId = req.body.userId;
          _context4.next = 5;
          return regeneratorRuntime.awrap(startSession());

        case 5:
          session = _context4.sent;
          _context4.prev = 6;
          // 트랜젝션 시작
          session.startTransaction(); // (1) class에서 entry code로 참가할 class를 찾는다.

          _context4.next = 10;
          return regeneratorRuntime.awrap(Class.findOne({
            entrycode: entrycode
          }).session(session));

        case 10:
          classInfo = _context4.sent;
          _context4.next = 13;
          return regeneratorRuntime.awrap(JoinedUser.countDocuments({
            userId: userId,
            classId: classInfo._id
          }).exec({
            session: session
          }));

        case 13:
          already = _context4.sent;

          if (!(already > 0)) {
            _context4.next = 16;
            break;
          }

          throw '이미 가입되어 있습니다!';

        case 16:
          // 1-2) 최초 가입이라면,
          // (2) JoinedUser 스키마에 학생ID, classID를 넣어 학생을 등록시킨다.
          cjoineduser = new JoinedUser({
            userId: userId,
            classId: classInfo._id
          });
          _context4.next = 19;
          return regeneratorRuntime.awrap(cjoineduser.save({
            session: session
          }));

        case 19:
          savejoineduser = _context4.sent;
          // (3) 기본 계좌 개설
          caccount = new Account({
            studentId: cjoineduser._id
          }); //console.log('create Account',caccount)

          _context4.next = 23;
          return regeneratorRuntime.awrap(caccount.save({
            session: session
          }));

        case 23:
          saveaccount = _context4.sent;
          // (4) 주식 계좌 개설
          saccount = new StockAccount({
            studentId: cjoineduser._id
          });
          _context4.next = 27;
          return regeneratorRuntime.awrap(saccount.save({
            session: session
          }));

        case 27:
          savesaccount = _context4.sent;
          _context4.next = 30;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 30:
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context4.next = 40;
          break;

        case 34:
          _context4.prev = 34;
          _context4.t0 = _context4["catch"](6);
          _context4.next = 38;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 38:
          session.endSession();
          res.json({
            success: false,
            err: _context4.t0
          });

        case 40:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 34]]);
});
/*
  [정상]class에 join한 User의 class내 ID
  : redux에 저장하기 위해서 사용
*/

router.get("/:id/join", function (req, res) {
  var classId = req.params.id;
  var userId = req.query.userId;
  JoinedUser.findOne({
    classId: classId,
    userId: userId
  }, function (err, joineduser) {
    var result = joineduser._id;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*참가코드로 해당 국가 찾기*/

router.get("/find", function (req, res) {
  entryCode = req.query.entryCode;
  Class.findOne({
    entrycode: entryCode
  }, function (err, classes) {
    console.log(classes);
    if (err) return res.status(500).json({
      error: err
    });
    res.json(classes);
  });
});
/*
  [] JoinedUser 학생 한명 삭제
  학생의 클래스 탈퇴 or 선생님 권한으로 삭제 : 클래스에 속한 학생의 모든 정보를 삭제해야 함
  */

router["delete"]("/:id/join", function _callee4(req, res) {
  var classId, userId, session, joined, allaccount, deltrans, delaccount, delfine, deljoindeposit, delhistory, delstockacc, deljoined;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // {classId:, userId:}
          //console.log(req.params.id, req.query.userId);
          classId = req.params.id;
          userId = req.query.userId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(startSession());

        case 4:
          session = _context5.sent;
          _context5.prev = 5;
          session.startTransaction(); //JoinedUser

          _context5.next = 9;
          return regeneratorRuntime.awrap(JoinedUser.findOne({
            classId: classId,
            userId: userId
          }).exec({
            session: session
          }));

        case 9:
          joined = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(Account.find({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 12:
          allaccount = _context5.sent;
          _context5.next = 15;
          return regeneratorRuntime.awrap(AccountTransaction.deleteMany({
            accountId: {
              $in: allaccount
            }
          }).exec({
            session: session
          }));

        case 15:
          deltrans = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(Account.deleteMany({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 18:
          delaccount = _context5.sent;
          _context5.next = 21;
          return regeneratorRuntime.awrap(Fine.deleteMany({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 21:
          delfine = _context5.sent;
          _context5.next = 24;
          return regeneratorRuntime.awrap(JoinDeposit.deleteMany({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 24:
          deljoindeposit = _context5.sent;
          _context5.next = 27;
          return regeneratorRuntime.awrap(StockOrderHistory.deleteMany({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 27:
          delhistory = _context5.sent;
          _context5.next = 30;
          return regeneratorRuntime.awrap(StockAccount.deleteMany({
            studentId: joined._id
          }).exec({
            session: session
          }));

        case 30:
          delstockacc = _context5.sent;
          _context5.next = 33;
          return regeneratorRuntime.awrap(JoinedUser.deleteOne({
            classId: classId,
            userId: userId
          }).exec({
            session: session
          }));

        case 33:
          deljoined = _context5.sent;
          _context5.next = 36;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 36:
          session.endSession();
          res.status(200).json({
            success: true,
            message: '삭제 완료되었습니다'
          });
          _context5.next = 46;
          break;

        case 40:
          _context5.prev = 40;
          _context5.t0 = _context5["catch"](5);
          _context5.next = 44;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 44:
          session.endSession();
          res.json({
            success: false,
            err: _context5.t0
          });

        case 46:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 40]]);
});
module.exports = router;