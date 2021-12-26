"use strict";

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

/* base URL
  : /api/jobs
*/
var express = require('express');

var _require = require('../models/Job/Job'),
    Job = _require.Job;

var router = express.Router();

var _require2 = require('../models/JoinedUser'),
    JoinedUser = _require2.JoinedUser;

var _require3 = require('mongoose'),
    startSession = _require3.startSession;

var _require4 = require('../models/Bank/Account'),
    Account = _require4.Account;

var _require5 = require('../models/Bank/AccountTransaction'),
    AccountTransaction = _require5.AccountTransaction;

var _require6 = require('../models/Tax/Tax'),
    Tax = _require6.Tax;

var _require7 = require('../models/Tax/Budget'),
    Budget = _require7.Budget;

var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;
/*
  [정상] Job 생성
  {classId: , Job정보들~}
*/

router.post('/', function (req, res) {
  var newJob = new Job(req.body); // jab생성시 이름이 중복으로 존재하는지 체크함

  var exJob = Job.findOne({
    jobId: req.body.jobId
  });

  if (exJob) {
    console.log('존재하는 직업입니다.');
    res.send('job_create_error=exist');
    next(error);
  }

  newJob.save(function (err, doc) {
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
  [정상] 선생님용클래스 별 모든 Job 불러오기
  : Job에서 classId 이용. {classId:} ondelete 관계 없이
*/

router.get('/manage', function (req, res) {
  var classId = req.query.classId;
  Job.find({
    classId: classId
  }, function (err, jobs) {
    var result = jobs;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [정상] 학생용 클래스 별 모든 Job 불러오기 -apply하는 곳에서는 안보여야 한다
  : Job에서 classId 이용. {classId:} ondelete:false
*/

router.get('/', function (req, res) {
  var classId = req.query.classId;
  Job.find({
    classId: classId,
    ondelete: false
  }, function (err, jobs) {
    var result = jobs;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [정상] Job 정보 업데이트
  : Job 에서 Job._id 이용
*/

router.put('/', function (req, res) {
  Job.updateOne({
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
  [완료] Job 삭제 -> 예금 삭제처럼 로직됨
*/

router["delete"]('/:id', function _callee(req, res) {
  var jobId, session, havejob, res1, res2, res3;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          jobId = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(startSession());

        case 3:
          session = _context.sent;
          _context.prev = 4;
          session.startTransaction(); // joinedUser에 jobId가 없다면 (해당 job을 가진 학생이 없다)

          _context.next = 8;
          return regeneratorRuntime.awrap(JoinedUser.countDocuments({
            jobId: jobId
          }).exec({
            session: session
          }));

        case 8:
          havejob = _context.sent;

          if (!(havejob <= 0)) {
            _context.next = 18;
            break;
          }

          _context.next = 12;
          return regeneratorRuntime.awrap(JoinedUser.updateMany({}, {
            $pull: {
              jobId: jobId
            }
          }).exec({
            session: session
          }));

        case 12:
          res1 = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(Job.deleteOne({
            _id: jobId
          }).exec({
            session: session
          }));

        case 15:
          res2 = _context.sent;
          _context.next = 21;
          break;

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(Job.updateOne({
            _id: jobId
          }, {
            $set: {
              ondelete: true
            }
          }).exec({
            session: session
          }));

        case 20:
          res3 = _context.sent;

        case 21:
          _context.next = 23;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 23:
          // 트랜젝션 종료
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context.next = 33;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](4);
          _context.next = 31;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 31:
          session.endSession();
          res.json({
            success: false,
            err: _context.t0
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 27]]);
});
/*
  [정상]해당 직업을 가지고 있는 모든 학생
*/

router.get('/:id/students', function (req, res) {
  var jobId = req.params.id;
  var classId = req.query.classId;
  JoinedUser.aggregate([{
    $match: {
      'classId': ObjectId(classId),
      'jobId': ObjectId(jobId)
    }
  }, {
    $project: {
      "userId": '$userId'
    }
  }, {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user'
    }
  }, {
    $unwind: '$user'
  }, {
    $project: {
      "name": '$user.name'
    }
  }]).exec(function (err, employee) {
    var result = employee;
    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [완성]Job마다 salary 부여&세금 부여
*/

router.post('/salary', function _callee2(req, res) {
  var classId, session, jobs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v, userjob, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, job, account, give, after, salary, tax, incometax, minus, after2, paytax, budget;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('/salary', req.body);
          classId = req.body.classId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(startSession());

        case 4:
          session = _context2.sent;
          _context2.prev = 5;
          session.startTransaction(); // 1) student의 job & account 확인

          _context2.next = 9;
          return regeneratorRuntime.awrap(JoinedUser.find({
            classId: classId
          }).exec({
            session: session
          }));

        case 9:
          jobs = _context2.sent;
          //let i =0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 13;
          _iterator2 = jobs[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context2.next = 84;
            break;
          }

          v = _step2.value;
          _context2.next = 19;
          return regeneratorRuntime.awrap(Job.find({
            '_id': {
              $in: v.jobId
            }
          }).exec({
            session: session
          }));

        case 19:
          userjob = _context2.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context2.prev = 22;
          _iterator = _asyncIterator(userjob);

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(_iterator.next());

        case 26:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 30;
          return regeneratorRuntime.awrap(_step.value);

        case 30:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 65;
            break;
          }

          job = _value;
          _context2.next = 35;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: v._id
          }).exec({
            session: session
          }));

        case 35:
          account = _context2.sent;
          _context2.next = 38;
          return regeneratorRuntime.awrap(Account.updateOne({
            _id: account._id
          }, {
            $inc: {
              currentBalance: job.salary
            }
          }).exec({
            session: session
          }));

        case 38:
          give = _context2.sent;
          _context2.next = 41;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: v._id
          }).exec({
            session: session
          }));

        case 41:
          after = _context2.sent;
          salary = new AccountTransaction({
            accountId: account._id,
            transactionType: 1,
            amount: job.salary,
            afterbalance: after.currentBalance,
            memo: '월급'
          });
          _context2.next = 45;
          return regeneratorRuntime.awrap(salary.save({
            session: session
          }));

        case 45:
          _context2.next = 47;
          return regeneratorRuntime.awrap(Tax.findOne({
            classId: classId
          }).exec({
            session: session
          }));

        case 47:
          tax = _context2.sent;
          incometax = Math.round(tax.taxlist.income * job.salary / 100); //3-2) 통장에서 세금 징수

          if (!(incometax > 0)) {
            _context2.next = 62;
            break;
          }

          _context2.next = 52;
          return regeneratorRuntime.awrap(Account.updateOne({
            _id: account._id
          }, {
            $inc: {
              currentBalance: -incometax
            }
          }).exec({
            session: session
          }));

        case 52:
          minus = _context2.sent;
          _context2.next = 55;
          return regeneratorRuntime.awrap(Account.findOne({
            studentId: v._id
          }).exec({
            session: session
          }));

        case 55:
          after2 = _context2.sent;
          //3-3) 통장에 내역 기록 -------------------------
          paytax = new AccountTransaction({
            accountId: account._id,
            transactionType: 0,
            amount: incometax,
            afterbalance: after2.currentBalance,
            //
            memo: '소득세'
          });
          _context2.next = 59;
          return regeneratorRuntime.awrap(paytax.save({
            session: session
          }));

        case 59:
          _context2.next = 61;
          return regeneratorRuntime.awrap(Budget.updateOne({
            classId: classId
          }, {
            $inc: {
              "balance.income": +incometax
            }
          }).exec({
            session: session
          }));

        case 61:
          budget = _context2.sent;

        case 62:
          _iteratorNormalCompletion = true;
          _context2.next = 24;
          break;

        case 65:
          _context2.next = 71;
          break;

        case 67:
          _context2.prev = 67;
          _context2.t0 = _context2["catch"](22);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 71:
          _context2.prev = 71;
          _context2.prev = 72;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context2.next = 76;
            break;
          }

          _context2.next = 76;
          return regeneratorRuntime.awrap(_iterator["return"]());

        case 76:
          _context2.prev = 76;

          if (!_didIteratorError) {
            _context2.next = 79;
            break;
          }

          throw _iteratorError;

        case 79:
          return _context2.finish(76);

        case 80:
          return _context2.finish(71);

        case 81:
          _iteratorNormalCompletion2 = true;
          _context2.next = 15;
          break;

        case 84:
          _context2.next = 90;
          break;

        case 86:
          _context2.prev = 86;
          _context2.t1 = _context2["catch"](13);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t1;

        case 90:
          _context2.prev = 90;
          _context2.prev = 91;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 93:
          _context2.prev = 93;

          if (!_didIteratorError2) {
            _context2.next = 96;
            break;
          }

          throw _iteratorError2;

        case 96:
          return _context2.finish(93);

        case 97:
          return _context2.finish(90);

        case 98:
          _context2.next = 100;
          return regeneratorRuntime.awrap(session.commitTransaction());

        case 100:
          session.endSession();
          res.status(200).json({
            success: true
          });
          _context2.next = 111;
          break;

        case 104:
          _context2.prev = 104;
          _context2.t2 = _context2["catch"](5);
          console.log(_context2.t2);
          _context2.next = 109;
          return regeneratorRuntime.awrap(session.abortTransaction());

        case 109:
          session.endSession();
          res.json({
            success: false,
            err: _context2.t2
          });

        case 111:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 104], [13, 86, 90, 98], [22, 67, 71, 81], [72,, 76, 80], [91,, 93, 97]]);
});
module.exports = router;