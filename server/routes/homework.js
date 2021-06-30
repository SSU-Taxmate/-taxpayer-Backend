const express = require('express');
const { Homework,HomeworkType } = require('../models/Homework');
const router = express.Router();
//create
router.post('/', (req, res) => {
  const chomework=new Homework(req.body);
  console.log(chomework)
  chomework.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
        success: true
    });
});
  })
//read
router.get('/', (req, res) => {
  Homework.find({},function(err,hw){
    //console.log(hwtypes)
    const result={data:hw}
    if (err)return res.status(500).json({error: err});
    res.json(result)
  }) /**/
  })
//update
router.put('/', (req, res) => {
  const uhomework=new Homework(req.body);
  console.log(uhomework)
  Homework.updateOne({_id:uhomework._id},uhomework,(err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })

})
//delete
router.delete('/', (req, res) => {
  const hwtype=new Homework(req.body);
  //console.log(req.body)
  Homework.find({_id:hwtype._id})
  .deleteOne().exec()

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
