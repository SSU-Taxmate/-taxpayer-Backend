/* base URL
  : /api/taxes
*/
const express = require('express');
const { Tax } = require('../models/Tax');
const router = express.Router();

/*
  [정상] 각 항목별 tax 비율 수정
*/
router.put('/', (req, res) => {
  //console.log('routes:/set-up',req.body)
  Tax.updateOne({ _id: req.body._id },{ $set: req.body} , (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [정상] 각 클래스에 해당하는 Tax 설정 가져오기
*/
router.get('/', (req, res) => {
  //console.log('routes:tax',req.query)
  Tax.findOne(req.query).exec((err,tax) => {
    const result = tax
    console.log(tax.taxId)
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  }) 
})


module.exports = router;
