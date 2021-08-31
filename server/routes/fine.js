/* base URL
  : /api/classes
*/
const express = require("express");
const { Fine } = require("../models/Judiciary/Fine");
const { User } = require("../models/User");
const { JoinedUser } = require('../models/JoinedUser');

const router = express.Router(); /* moongoose로 서버와 데이터베이스 연결 */

/*
  [정상] class 생성
*/
router.post("/", (req, res) => {
  console.log("시작");
  
  const fine = new Fine(req.body);
  console.log(fine);

  fine.save((err, doc) => {
    console.log("theend")
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/", async (req, res) => {
  try {
    console.log("벌금 가져오기");
    const classid = req.query.classId;
    const fines = await Fine.find({classId:classid}).populate("studentId").populate("lawReason");
   let result = await Promise.all(
     fines.map(async (v, i) => {
       console.log("벌금 체크")
       const student = await JoinedUser.findOne({_id: v.studentId}).populate('userId')
       console.log( "name",student.userId.name)
       return {
         '_id':v._id, 
         'studentId': v.studentId,
         'name': student.userId.name, 'Amount': v.Amount,
         'isPayed': v.isPayed, 'lawReason':v.lawReason.title, 
        }
      })
      )
  

    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
})
module.exports = router;
