/* base URL
  : /api/classes
*/
const express = require("express");
const { startSession } = require("mongoose");
const { Account } = require("../models/Bank/Account");
const { Budget } = require("../models/Tax/Budget");
//const { BudgetAccount } = require('../models/Tax/BudgetAccount')
const { Class } = require("../models/Class");
const { JoinedUser } = require("../models/JoinedUser");
const { Tax } = require("../models/Tax/Tax");
const { StockAccount } = require("../models/Stock/StockAccount");
const { AccountTransaction } = require("../models/Bank/AccountTransaction");
const {Fine}=require('../models/Judiciary/Fine')
const {JoinDeposit}=require('../models/Bank/JoinDeposit')
const {StockOrderHistory}=require('../models/Stock/StockOrderHistory')
const moment=require('moment-timezone')
const router = express.Router();

/*
  [정상] class 생성
*/
router.post("/", async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();
    // 1) Class 생성
    // 1-1) Class 생성시 랜덤번호 부여.
    var Random = Math.floor(Math.random() * 89999) + 10000; //10000~99999사이의값.
    while ((entry_check = await Class.findOne({ entrycode: Random }))) {
      Random = Random + 1;
      if (Random > 99999) {
        Random = 10000;
      }
    } // 중복없는 랜덤번호
    const cClass = await Class.create({
      name: req.body.name,
      image: req.body.image,
      comment: req.body.comment,
      teacherId: req.body.teacherId,
      entrycode: Random,
    });
    const classres = await cClass.save({ session });
    // 2) Tax default 생성
    const cTax = new Tax({ classId: cClass._id });
    const taxres = await cTax.save({ session });
    // 3) Class Account 생성
    const budget = new Budget({ classId: cClass._id ,month:moment().tz('Asia/Seoul').month()+1});
    //const budgetaccount = new BudgetAccount({ classId: cClass._id })
    const accountres = await budget.save({ session });
   // const bacount = await budgetaccount.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
});

/*
  [정상] classes 불러오기
  : 학생의 경우 JoinedUser에 클래스 내의 정보가 저장된다.
    - req.query{userId:} _학생or선생님
*/
router.get("/", (req, res) => {
  if (req.query.role === "0") {
    //선생님 - Class의 teacher가 일치하는 값
    Class.find({ teacherId: req.query.userId }, function (err, classes) {
      if (err) return res.status(500).json({ error: err });
      res.json(classes);
    });
  } else {
    //학생- JoinedUser의 userId가 일치하는 값
    const a = async () => {
      const userclass = await JoinedUser.find(
        { userId: req.query.userId },
        "classId"
      );
      var classIds = [];
      for (let i = 0; i < userclass.length; i++) {
        classIds.push(userclass[i].classId);
      }
      //학생이 속해있는 class 정보 얻음.
      const classInfo = await Class.find({ _id: { $in: classIds } });
      return res.json(classInfo);
    };
    a();
  }
});
/*
  [정상] class 정보 업데이트
  : comment, image
*/
router.put("/", (req, res) => {
  Class.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
/*
  class 삭제 - 미완 (Cascade- 모두 합친 cascade)
  : (1) ClassId - Tax, Stock, Homework 모두 삭제
    (2) ClassId - Class 삭제
    - req.query{classId:}
*/
router.delete("/:id", async (req, res) => {
  /*role확인*/
  const classId = req.params.id;
  const session = await startSession();
  try {
    session.startTransaction();
    //(1) tax에서 TaxId 확인 및 Tax에서 삭제
    //(2) stock에서 StockId 확인 및 Stock에서 삭제
    //(3) homework
    //(4) classId에 해당하는 Class 삭제
    await Class.find({ _id: classId }).deleteOne().session({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
  //ClassTax  deleteMany()
});

/*
  [정상] Class에 Join하기 위한 목적
  : 학생이 참가코드입력 - 이미 가입 되어 있다면 가입 되어있다고 메시지 보내기
*/
// transaction이 필요한지는 조금 더 고민해보자
router.post('/join', async (req, res) => {
  console.log('/classes/join', req.body)
  const entrycode = req.body.entrycode
  const userId = req.body.userId
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // (1) class에서 entry code로 참가할 class를 찾는다.
    const classInfo = await Class.findOne({ entrycode: entrycode }).session(session)
    // 1-1) 이미 가입 되어있다면,
    const already = await JoinedUser.countDocuments({ userId: userId, classId: classInfo._id }).exec({ session })
    if (already > 0) {
      throw '이미 가입되어 있습니다!'
    }
    // 1-2) 최초 가입이라면,
    // (2) JoinedUser 스키마에 학생ID, classID를 넣어 학생을 등록시킨다.
    const cjoineduser = new JoinedUser({ userId: userId, classId: classInfo._id });
    const savejoineduser = await cjoineduser.save({ session })
    // (3) 기본 계좌 개설
    const caccount = new Account({ studentId: cjoineduser._id })
    //console.log('create Account',caccount)
    const saveaccount = await caccount.save({ session })
    // (4) 주식 계좌 개설
    const saccount = new StockAccount({ studentId: cjoineduser._id })
    const savesaccount = await saccount.save({ session })

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
});
/*
  [정상]class에 join한 User의 class내 ID
  : redux에 저장하기 위해서 사용
*/
router.get("/:id/join", (req, res) => {
  const classId = req.params.id;
  const userId = req.query.userId;
  JoinedUser.findOne(
    { classId: classId, userId: userId },
    function (err, joineduser) {
      const result = joineduser._id;
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    }
  );
});
/*참가코드로 해당 국가 찾기*/
router.get("/find", (req, res) => {
  entryCode = req.query.entryCode;
  Class.findOne({ entrycode: entryCode }, function (err, classes) {
    console.log(classes);
    if (err) return res.status(500).json({ error: err });
    res.json(classes);
  });
});
/*
  [] JoinedUser 학생 한명 삭제
  학생의 클래스 탈퇴 or 선생님 권한으로 삭제 : 클래스에 속한 학생의 모든 정보를 삭제해야 함
  */
router.delete("/:id/join", async (req, res) => {
  // {classId:, userId:}
  //console.log(req.params.id, req.query.userId);
  const classId = req.params.id;
  const userId = req.query.userId;

  const session = await startSession();
  try {
    session.startTransaction();
    //JoinedUser
    const joined = await JoinedUser.findOne({ classId: classId, userId: userId }).exec({ session })
    //모든 Account
    const allaccount=await Account.find({studentId:joined._id}).exec({session})

    // 1) Account(Account._id: AccountTransaction), Fine, Joindeposit, StockOrderHistory, StockAccount, 
    //AccountTransaction
    const deltrans=await AccountTransaction.deleteMany({accountId:{$in:allaccount}}).exec({session})
    //Account
    const delaccount=await Account.deleteMany({ studentId: joined._id }).exec({session})
    //Fine
    const delfine=await Fine.deleteMany({studentId:joined._id}).exec({session})
    //Joindeposit
    const deljoindeposit=await JoinDeposit.deleteMany({studentId:joined._id}).exec({session}) 
    //StockOrderHistory
    const delhistory=await StockOrderHistory.deleteMany({studentId:joined._id}).exec({session})
    //StockAccount
    const delstockacc=await StockAccount.deleteMany({studentId:joined._id}).exec({session})
    //JoinedUser
    const deljoined = await JoinedUser.deleteOne({ classId: classId, userId: userId }).exec({ session })
    
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, message: '삭제 완료되었습니다' })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }
});


module.exports = router;
