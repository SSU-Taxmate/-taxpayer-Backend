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
  //Read
  router.get('/types', (req, res) => {
    HomeworkType.find({},(err,hwtypes)=>{
      //console.log(hwtypes)
      const result={data:hwtypes}
      if (err)return res.status(500).json({error: err});
      res.json(result)
    })
   
  })
  //Create
  router.post('/types', (req, res) => {
    const ctype=new HomeworkType(req.body);
    //console.log(hwtype)
    ctype.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
          success: true
      });
  });
  })
  //Update - 수정시 update되게
  router.put('/types', (req, res) => {
    const utype=new HomeworkType(req.body);
    HomeworkType.updateOne({_id:utype._id},utype,(err,doc)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).json({
        success:true
      })
    })

  })
  //Delete - axios 사용법 때문 
  router.delete('/types', (req, res) => {
    const hwtype=new HomeworkType(req.body);
    //console.log(req.body)
    HomeworkType.find({_id:hwtype._id})
    .deleteOne().exec()

  })
module.exports = router;
