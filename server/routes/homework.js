/* base URL
  : /api/homeworks
*/
const express = require('express');
const { Homework, GrantedHomework } = require('../models/Homework');
const { JoinedUser } = require('../models/Class')
const { startSession } = require('mongoose');
const router = express.Router();

/*
  [정상] Homework 생성 (선생님) - 학생이 없는 경우에 생성된 Homework는 무효처리
  1) Homework에 생성
  2) GrantedHomework에 연관관계 생성(Student-Homework ) - 엄청 커질텐데,,ㅎ
    : ClassId로 모든 Student를 찾고, 모든 Student에 대해 GrantedHomework 생성
*/
router.post('/', async (req, res) => {//{name:,date:,detail:,expDate,withinDeadline:,classId:,}
  const session = await startSession();
  // console.log(req.body)
  try {
    // 트랜젝션 시작
    session.startTransaction();
    // 1) Homework 생성
    const chomework = new Homework(req.body);
    const reshomework = await chomework.save({ session })
    //console.log('reshomework',reshomework)

    // 2) GrantedHomework생성
    // 2-1) JoinedUser에서 각 클래스에 속한 JoinedUser의 _id찾기
    const findstudent = await JoinedUser.find({ classId: req.body.classId }, '_id')
    let granthw = []
    // 2-2) 그 학생들에게 grantedhw 부여하기
    for (let i = 0; i < findstudent.length; i++) {
      granthw.push({ studentId: findstudent[i]._id, homeworkId: chomework._id })
    }
    //console.log(granthw)
    const granted = await GrantedHomework.insertMany(granthw);
    //console.log('granted',granted)
    // 트랜젝션 커밋
    await session.commitTransaction();
    // 끝
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

})

/* [정상] Class별 homework가져오기
   : [teacher/student] Class 내 Homework 자체 - {classId:}로 Homework에서 찾음
*/
router.get('/', (req, res) => {
  //console.log(req.query)
  Homework.find(req.query, function (err, hw) {
    //console.log(hw)
    const result = hw
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})

/*
  [정상] : homework를 수정한다.
*/
router.put('/', (req, res) => {
  console.log(req.body)
  Homework.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })

})
/*
  [정상] 등록된 homework 삭제
  1) GrantedHomework에서 homeworkId같은 것 삭제
  2) Homework에서 삭제
*/
router.delete('/', async (req, res) => {
  //console.log('/homework', req.query)
  const session = await startSession();
  try {
    // 트랜젝션 시작
    session.startTransaction();

    const ghw = await GrantedHomework.deleteMany({ homeworkId: req.query._id }, { session: session })
    //console.log(ghw)
    const reshw = await Homework.deleteOne({ _id: req.query._id }, { session: session })
    //console.log(reshw)

    // 트랜젝션 커밋
    await session.commitTransaction();
    // 끝
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err })
  }

})

/*
  [정상] [student] Student의 수행 여부 가져오기
  {homeworkId, studentId:joinedUser의 _id }로 GrantedHomework에서 찾는다. 
*/
router.get('/student', async (req, res) => {
  try {
    //console.log(req.query)
    const ghw = await GrantedHomework.find(req.query)
      .populate({ path: 'homeworkId', select: ['name', 'detail', 'expDate'] })
    //console.log('Class숙제와 student의 제출여부\n',ghw)
    let result;
    result = ghw.map((v, i) => {
      return {
        homeworkId:v.homeworkId._id,
        name: v.homeworkId.name,
        detail: v.homeworkId.detail,
        expDate: v.homeworkId.expDate,
        submission: v.submission,
        withinDeadline: v.withinDeadline,
        coupon_id: v.coupon_id,
      }
    })
    //console.log(result)
    res.json(result)
  } catch (err) {
    res.json({ success: false, err })
  }
})

module.exports = router;
