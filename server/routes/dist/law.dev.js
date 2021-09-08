"use strict";

/* base URL
  : /api/laws
*/
var express = require('express');

var _require = require('../models/Law'),
    Law = _require.Law;

var router = express.Router(); //create - classlaw에도 저장을 해야 함.

/*
  [정상] Law 생성
  : Law
*/

router.post('/', function (req, res) {
  //console.log('Law',req.body)
  var laws = new Law(req.body);
  console.log(laws);
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
  [정상] Class별 Law 모두 보여주기
  : Law
    - req.query {classId:}
*/

router.get('/', function (req, res) {
  //console.log('/law',req.query)
  Law.find(req.query, function (err, classlaw) {
    var result = classlaw; //console.log(result)

    if (err) return res.status(500).json({
      error: err
    });
    res.json(result);
  });
});
/*
  [정상] Law수정
  : Law
*/

router.put('/', function (req, res) {
  //console.log('update',req.body)
  Law.updateOne({
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
  [정상] Law 삭제 : deleteOne
*/

router["delete"]('/:id', function (req, res) {
  console.log(req.params.id);
  var lawId = req.params.id;
  Law.deleteOne({
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