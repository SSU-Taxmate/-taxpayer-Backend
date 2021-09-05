/* base URL
  : /api/classes
*/
const express = require("express");
const { startSession } = require('mongoose');
const { Fine } = require("../models/Judiciary/Fine");
const { JoinedUser } = require("../models/JoinedUser");
const { Account } = require('../models/Bank/Account');
const { AccountTransaction } = require('../models/Bank/AccountTransaction');
const router = express.Router(); /* moongoose로 서버와 데이터베이스 연결 */

/*
  [정상] class 생성
*/
router.post("/", (req, res) => {
  const fine = new Fine(req.body);
  fine.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/", async (req, res) => {
  try {
    const classid = req.query.classId;
    const fines = await Fine.find({ classId: classid })
      .populate("studentId")
      .populate("lawReason");
    let result = await Promise.all(
      fines.map(async (v, i) => {
        const student = await JoinedUser.findOne({ _id: v.studentId }).populate(
          "userId"
        );
        return {
          _id: v._id,
          studentId: v.studentId,
          studentId_id: student.userId._id,
          name: student.userId.name,
          Amount: v.Amount,
          isPayed: v.isPayed,
          lawReason: v.lawReason.title,
        };
      })
    );

    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put("/", async (req, res) => {
  const session = await startSession();

  try {
    session.startTransaction();// 트랜젝션 시작
    Amount = req.body.Amount
    const account = await Account.findOne({ studentId: req.body.studentId._id }).exec({session})
    if(account.currentBalance > Amount){
    fine = await Fine.updateOne({ _id: req.body._id }, { $set: { isPayed : 'true' }}).exec({session})
    const pay= await Account.updateOne({ _id: account._id }, { $inc: { currentBalance: (- Amount) } }, { session })
    const payfine = new AccountTransaction({
      accountId: account._id,
      transactionType: 0,
      amount: Amount,
      memo: '벌금납부',
      afterbalance: account.currentBalance -Amount
    })
    await payfine.save({ session })



    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true
    })
  }else{
    throw '잔액부족'
  }
  }catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

  


});
module.exports = router;
