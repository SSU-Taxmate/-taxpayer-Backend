const express = require('express');
const router = express.Router();
const {Budget}=require('../models/Tax/Budget')

/*
  [정상] : 학급 계좌(예산) 보기
  {classId:}
*/
router.get('/budget', (req, res) => {
    Budget.findOne(req.query,(err,doc)=>{
      const result=doc
      if (err) return res.status(500).json({ error: err });
      res.json(result)
    })
  })
module.exports = router;
