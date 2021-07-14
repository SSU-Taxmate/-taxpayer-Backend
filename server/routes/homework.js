const express = require('express');
const { Homework } = require('../models/Homework');
const router = express.Router();
//create
router.post('/', (req, res) => {
  const chomework=new Homework(req.body);
  //console.log(chomework)
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


module.exports = router;
