const express = require('express');
const { Homework,HomeworkType } = require('../models/Homework');
const router = express.Router();

router.get('/', (req, res) => {

  /*Homework.find({},function(err,hwtypes){
    //console.log(hwtypes)
    const result={data:hwtypes,columns:[
      {title:'타입id',field:'_id'},
      {title:"이름",field:"name"},
      {title:'최초생성날짜',field:'date'},
      {title:'만료일',field:"expDate"},
      {title:'자세한내용',field:'detail'},
      {title:'student_id',field:'student_id'},
      {title:'coupon_id',field:'coupon_id'},
    ]}
    if (err)return res.status(500).json({error: err});
    res.json(result)
  }) */
  })
  
  router.get('/types', (req, res) => {
    HomeworkType.find({},function(err,hwtypes){
      //console.log(hwtypes)
      const result={data:hwtypes}
      if (err)return res.status(500).json({error: err});
      res.json(result)
    })
   
  })
  router.post('/types', (req, res) => {
    const hwtype=new HomeworkType(req.body);
    //console.log(hwtype)
    hwtype.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
          success: true
      });
  });
  })
  
module.exports = router;
