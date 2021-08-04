const express = require('express');
const { Class, JoinClass } = require('../models/Class');
const router = express.Router();

//create - create요청한 user정보에 변화 필요.
router.post('/', (req, res) => {
  const cClass = new Class(req.body);
  cClass.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
})
//read - 리팩토링 필수
router.get('/', (req, res) => {
  //console.log('/server/routes/class', req.query)
  if (req.query.role === '0') {//선생님 - Class의 teacher 비교
    Class.find({ teacherId: req.query.userId }, function (err, classes) {
      if (err) return res.status(500).json({ error: err });
      res.json(classes)
    })
    
  }
  else {//학생- JoinClass의 student비교  - .populate('classId')?
    const a = async () => {
      const userclass = await JoinClass.find({ studentId: req.query.userId }, 'classId')
      var classIds=[]
      for (let i =0;i<userclass.length;i++){
        classIds.push(userclass[i].classId)
      }
      //학생이 속해있는 class정보 얻음.
      const classInfo = await Class.find({ _id: { "$in": classIds } })
      return res.json(classInfo)
    }
    a();
  }



})
//update
router.put('/', (req, res) => {/*role확인*/
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

/*
  Class에 Join하기 위한 목적
  : 학생이 참가코드입력
*/
router.post('/join', async (req, res) => {
  // class에서 entry code로 참가할 class를 찾는다.
  try {
    const classInfo = await Class.findOne({ entrycode: req.body.entrycode }).exec()

    // JoinClass 스키마에 학생ID, classID를 넣어 학생을 등록시킨다.
    const cjoinClass = new JoinClass({ studentId: req.body.studentId, classId: classInfo._id });

    const savejoinclass = await cjoinClass.save()

    return res.status(200).json({
      success: true
    })
    //아직 classId를 못받아옴.
  } catch (err) {
    return res.json({ success: false, err });
  }



})

module.exports = router;
