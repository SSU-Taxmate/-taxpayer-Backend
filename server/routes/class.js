const express = require('express');
const { Class } = require('../models/Class');
const router = express.Router();
//create - create요청한 user정보에 변화 필요.
router.post('/',  (req, res) => {
  const cClass = new Class(req.body);
  //console.log(req.body)
  cClass.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
})
//read - user에 따라 찾을 class가 달라짐. 어디서 확인?
router.get('/', (req, res) => {
  Class.find({}, function (err, classes) {
    //console.log(classes)
    const result = { classes }
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  }) 
})
//update
router.put('/',(req, res) => {/*role확인*/
  const uclass = new Class(req.body);
  //console.log(uclass)
  Class.updateOne({ _id: uclass._id }, uclass, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
//delete
router.delete('/', (req, res) => {/*role확인*/
  const dclass = new Class(req.body);
  //console.log(req.body)
  Class.find({ _id: dclass._id })
    .deleteOne().exec()

})


module.exports = router;
