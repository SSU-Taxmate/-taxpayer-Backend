const express = require('express');
const { Class } = require('../models/Class');
const router = express.Router();
//create
router.post('/', (req, res) => {
  const chomework=new Class(req.body);
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
    Class.find({},function(err,classes){
    //console.log(classes)
    const result={classes}
    if (err)return res.status(500).json({error: err});
    res.json(result)
  }) /**/
  })
//update
router.put('/', (req, res) => {
  const uclass=new Class(req.body);
  console.log(uclass)
  Class.updateOne({_id:uclass._id},uclass,(err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })

})
//delete
router.delete('/', (req, res) => {
  const dclass=new Class(req.body);
  //console.log(req.body)
  Class.find({_id:dclass._id})
  .deleteOne().exec()

})


module.exports = router;
