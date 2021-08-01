const express = require('express');
const { Law } = require('../models/Law');
const router = express.Router();
//create
router.post('/', (req, res) => {
  const laws=new Law(req.body);
  //console.log(laws)
  laws.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
        success: true
    });
});
  })
//read
router.get('/', (req, res) => {
    Law.find({},function(err,law){
    //console.log('read',law)
    const result=law
    if (err)return res.status(500).json({error: err});
    res.json(result)
  }) /**/
  })
//update
router.put('/', (req, res) => {/*/:lawId 로 바꿔야 함 */
  const ulaw=new Law(req.body);
  //console.log('update',ulaw)
  Law.updateOne({_id:ulaw._id},ulaw,(err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })

})
//delete - 되기는 하지만, 권한을 확인하는 코드를 추가
router.delete('/',(req,res)=>{
 Law.deleteOne(req.query, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
})

module.exports = router;
