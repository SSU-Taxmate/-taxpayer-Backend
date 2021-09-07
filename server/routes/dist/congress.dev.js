"use strict";

/* base URL
  : /api/congress
*/
var express = require('express');

var _require = require('../models/Law_suggest'),
    LawSuggest = _require.LawSuggest;

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

router.get('/', function (req, res) {
  LawSuggest.find(req.query, function (err, classlaw) {
    var result = classlaw; //console.log(result)

    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
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
module.exports = router;