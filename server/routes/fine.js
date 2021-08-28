/* base URL
  : /api/classes
*/
const express = require("express");
const { Fine } = require("../models/Judiciary/Fine");
const router = express.Router(); /* moongoose로 서버와 데이터베이스 연결 */

/*
  [정상] class 생성
*/
router.post("/", (req, res) => {
  console.log("시작");
  console.log("/api/fine/", req.body);

  const fine = new Fine(req.body);
  console.log(fine);

  fine.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
module.exports = router;
