"use strict";

/* base URL
  : /api/congress
*/
var express = require('express');

var _require = require('../models/Law_suggest'),
    LawSuggest = _require.LawSuggest;

var _require2 = require('../models/JoinedUser'),
    JoinedUser = _require2.JoinedUser;

var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;
var router = express.Router();
/*
  [정상] Suggest_law 생성
  : Suggest_law
*/

router.post('/', function (req, res) {
  var laws = new LawSuggest(req.body);
  laws.save(function (err, doc) {
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
  [정상] Class별 SuggestLaw 모두 보여주기
  : Suggest_Law
    - req.query {classId:}
*/

router.get('/', function _callee(req, res) {
  var classId, studentnum, lawsuggest, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          classId = req.query.classId;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(JoinedUser.countDocuments({
            'classId': classId
          }).exec());

        case 4:
          studentnum = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(LawSuggest.aggregate([{
            $match: {
              "classId": ObjectId(classId)
            }
          }, {
            $lookup: {
              from: 'users',
              "let": {
                initiator: '$initiator'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$initiator', '$_id']
                  }
                }
              }, {
                $project: {
                  'name': 1
                }
              }],
              as: 'initiator'
            }
          }, {
            $unwind: '$initiator'
          }, {
            $addFields: {
              'numvoter': {
                $size: '$vote'
              },
              'numpros': {
                $size: {
                  $filter: {
                    input: '$vote',
                    as: 'voter',
                    cond: {
                      $eq: ['$$voter.value', true]
                    }
                  }
                }
              }
            }
          }]));

        case 7:
          lawsuggest = _context.sent;
          result = {
            lawsuggest: lawsuggest,
            studentnum: studentnum
          };
          res.send(result);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.json({
            success: false,
            err: err
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
/*
  [정상] Suggest_Law수정
  : Suggest_Law
*/

router.put('/', function (req, res) {
  LawSuggest.updateOne({
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
  [정상] Suggest_Law 삭제 : deleteOne
*/

router["delete"]('/:id', function (req, res) {
  console.log(req.params.id);
  var lawId = req.params.id;
  LawSuggest.deleteOne({
    _id: lawId
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
  [정상] Suggest_law 업데이트
*/

router.post('/agree', function (req, res) {
  console.log(req.body._id);
  LawSuggest.updateOne({
    _id: req.body._id
  }, {
    $push: {
      vote: {
        initiator: req.body.vote.initiator,
        value: req.body.vote.value
      }
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
router.post('/vote', function (req, res) {
  console.log(req.body._id);
  LawSuggest.updateOne({
    _id: req.body._id
  }, {
    $push: {
      vote: {
        initiator: req.body.vote.initiator,
        value: req.body.vote.value
      }
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
router.post('/approve', function (req, res) {
  LawSuggest.updateOne({
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
    SuggestLaw 하나의 vote값만 가져오기
*/

router.get('/:id/vote', function (req, res) {
  console.log(req.body._id);
  LawSuggest.updateOne({
    _id: req.body._id
  }, {
    $push: {
      vote: {
        initiator: req.body.vote.initiator,
        value: req.body.vote.value
      }
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
module.exports = router;