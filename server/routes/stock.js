const express = require('express');
const { Stock } = require('../models/Stock');
const router = express.Router();
//read
router.get("/", (req, res) => {
    Stock.find({},function(err,stock){
        const result=stock
        //console.log('read',result)
        if (err)return res.status(500).json({error: err});
        res.json(result)
    })
});
//create
router.post("/", (req, res) => {
    //console.log('create',req.body)
    const newstock=new Stock(req.body);
    newstock.save((err,doc)=>{
        if (err) return res.json({success: false, err })
        return res.status(200).json({
            success: true
        });
    })
});
router.put('/:stockId', (req, res) => {
    const changeStock=new Stock(req.body);
    //console.log('update',ulaw)
    changeStock.updateOne({_id:changeStock._id},changeStock,(err,doc)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).json({
        success:true
      })
    })
  
  })
module.exports = router;
