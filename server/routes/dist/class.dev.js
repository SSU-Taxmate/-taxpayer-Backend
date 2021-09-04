"use strict";

/* base URL
  : /api/classes
*/
var express = require('express');

var _require = require('mongoose'),
    startSession = _require.startSession;

var _require2 = require('../models/Bank/Account'),
    Account = _require2.Account;

var _require3 = require('../models/Tax/Budget'),
    Budget = _require3.Budget;

var _require4 = require('../models/Class'),
    Class = _require4.Class;

var _require5 = require('../models/JoinedUser'),
    JoinedUser = _require5.JoinedUser;

var _require6 = require('../models/Tax/Tax'),
    Tax = _require6.Tax;

var _require7 = require('../models/Stock/StockAccount'),
    StockAccount = _require7.StockAccount;

var router = express.Router();
/*
  [정상] class 생성
*/

router.post('/', function _callee(req, res) {
  var session, Random, cClass, classres, cTax, taxres, budget, accountres;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(startSession());

        case 2:
          session = _context.sent;
          _context.prev = 3;
          //console.log('시작')
          // 트랜젝션 시작
          session.startTransaction(); // 1) Class 생성
          // 1-1) Class 생성시 랜덤번호 부여.

          Random = Math.floor(Math.random() * 89999) + 10000; //10000~99999사이의값.
          // console.log("랜덤" + Random);

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

          Random = Random + 1; // console.log("랜덤_중복" + Random);

          if (Random > 99999) {
            Random = 10000;
          }

          _context.next = 6;
          break;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(Class.create({
            name: req.body.name,
            image: req.body.image,
            comment: req.body.comment,
            teacherId: req.body.teacherId,
            entrycode: Random
          }));

        case 15:
          cClass = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(cClass.save({
            session: session
          }));

        case 18:
          classres = _context.sent;
          //console.log('cClass', cClass)
          // 2) Tax default 생성
          cTax = new Tax({
            classId: cClass._id
          }); //console.log('cTax',cTax)

          _context.next = 22;
          return regeneratorRuntime.awrap(cTax.save({
            session: session
          }));

        case 22:
          taxres = _context.sent;
          //console.log(taxres)
          // 3) Class Account 생성
          budget = new Budget({
            classId: cClass._id
          }); //console.log(budget)

          _context.next = 26;
          return regeneratorRuntime.awrap(budget.save({
            session: session
          }));

        case 26:
          accountres = _context.sent;
          _context.next = 29;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 29:
          // 끝
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context.next = 39;
          break;

        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](3);
          _context.next = 37;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 37:
          session.endSession();
          res.json({
            success: false,
            err: _context.t0
          });

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 33]]);
});
/*
  [정상] classes 불러오기
  : 선생님, 학생 (role)에 따라 찾아야할 위치가 다르다.
    - req.query{userId:} _학생or선생님
*/

router.get('/', function (req, res) {
  //console.log('/server/routes/class', req.query)
  if (req.query.role === '0') {
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
              }, 'classId'));

            case 2:
              userclass = _context2.sent;
              classIds = [];

              for (i = 0; i < userclass.length; i++) {
                classIds.push(userclass[i].classId);
              } //학생이 속해있는 class정보 얻음.


              _context2.next = 7;
              return regeneratorRuntime.awrap(Class.find({
                _id: {
                  "$in": classIds
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

router.put('/', function (req, res) {
  //console.log(req.body)
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

router["delete"]('/:id', function _callee2(req, res) {
  var classId, session;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          /*role확인*/
          //classId필수
          console.log(req.params.id);
          classId = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(startSession());

        case 4:
          session = _context3.sent;
          _context3.prev = 5;
          // 트랜젝션 시작
          session.startTransaction(); //(1) tax에서 TaxId 확인 및 Tax에서 삭제
          //(2) stock에서 StockId 확인 및 Stock에서 삭제
          //(3) homework
          //(final) classId에 해당하는 Class 삭제

          _context3.next = 9;
          return regeneratorRuntime.awrap(Class.find({
            _id: classId
          }).deleteOne().session({
            session: session
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 11:
          // 트랜젝션 종료
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context3.next = 21;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](5);
          _context3.next = 19;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 19:
          session.endSession();
          res.json({
            success: false,
            err: _context3.t0
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 15]]);
});
/*
  [정상/리팩토링필요] Class에 Join하기 위한 목적
  : 학생이 참가코드입력
*/
// transaction이 필요한지는 조금 더 고민해보자

router.post('/join', function _callee3(req, res) {
  var session, classInfo, cjoineduser, savejoineduser, caccount, saveaccount, saccount, savesaccount;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(startSession());

        case 2:
          session = _context4.sent;
          _context4.prev = 3;
          // 트랜젝션 시작
          session.startTransaction(); // (1) class에서 entry code로 참가할 class를 찾는다.

          _context4.next = 7;
          return regeneratorRuntime.awrap(Class.findOne({
            entrycode: req.body.entrycode
          }).session(session));

        case 7:
          classInfo = _context4.sent;
          //console.log(classInfo)
          // (2) JoinedUser 스키마에 학생ID, classID를 넣어 학생을 등록시킨다.
          cjoineduser = new JoinedUser({
            userId: req.body.userId,
            classId: classInfo._id
          });
          _context4.next = 11;
          return regeneratorRuntime.awrap(cjoineduser.save({
            session: session
          }));

        case 11:
          savejoineduser = _context4.sent;
          //console.log('Save Joined User',savejoineduser)
          // (3) 기본 계좌 개설
          caccount = new Account({
            studentId: cjoineduser._id
          }); //console.log('create Account',caccount)

          _context4.next = 15;
          return regeneratorRuntime.awrap(caccount.save({
            session: session
          }));

        case 15:
          saveaccount = _context4.sent;
          // (4) 주식 계좌 개설
          saccount = new StockAccount({
            studentId: cjoineduser._id
          });
          _context4.next = 19;
          return regeneratorRuntime.awrap(saccount.save({
            session: session
          }));

        case 19:
          savesaccount = _context4.sent;
          _context4.next = 22;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 22:
          // 트랜젝션 종료
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context4.next = 32;
          break;

        case 26:
          _context4.prev = 26;
          _context4.t0 = _context4["catch"](3);
          _context4.next = 30;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 30:
          session.endSession();
          res.json({
            success: false,
            err: _context4.t0
          });

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 26]]);
});
/*
  [정상]class에 join한 User의 class내 ID
  : redux에 저장하기 위해서 사용
*/

router.get('/:id/join', function (req, res) {
  //console.log(req.params.id,req.query)
  var classId = req.params.id;
  var userId = req.query.userId;
  JoinedUser.findOne({
    classId: classId,
    userId: userId
  }, function (err, joineduser) {
    //console.log(joineduser)
    var result = joineduser._id;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [] JoinedUser 학생 한명 삭제
  학생의 클래스 탈퇴
  클래스에 속한 학생의 모든 정보를 삭제해야 함
*/

router["delete"]('/:id/join', function (req, res) {
  // {classId:, userId:}
  console.log(req.params.id, req.query.userId);
  var classId = req.params.id;
  var userId = req.query.userId;
  JoinedUser.findOne({
    classId: classId,
    userId: userId
  }).deleteOne(function (err) {
    if (err) return handleError(err);
    res.json({
      success: true
    });
  });
}); // class extends React.Component {
//     state = { number: [0, 0, 0, 0, 0, 0, 0] };
//     randomize = () => {
//         if (!this.state.effect) {
//             const numberCopy = numbers.map((x) => x);
//             const arr = [];
//             for (let i = 0; i <= 7; i++) {
//                 const random = Math.floor(
//                     Math.random() * (numberCopy.length - 1)
//                 );
//                 arr.push(numberCopy[random] + 1);
//                 numberCopy.splice(random, 1);
//             }
//             this.setState({ number: arr, effect: true });
//             setTimeout(() => {
//                 this.setState({ effect: false });
//             }, 8000);
//         }
//     };
// }

module.exports = router;