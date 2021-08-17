/* base URL
  : /api/jobs
*/
const express = require('express');
const { Job } = require('../models/Job');
const router = express.Router();
const { JoinedUser } = require('../models/Class');
const { startSession } = require('mongoose');
/*
  [정상] Job 생성
  {classId: , Job정보들~}
*/
router.post('/', (req, res) => {
  //console.log('job post', req.body)
  const newJob = new Job(req.body);
  newJob.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

/*
  [정상] 클래스 별 모든 Job 불러오기
  : Job에서 classId 이용. {classId:}
*/
router.get('/', (req, res) => {
  //console.log('job get', req.query)
  Job.find(req.query, function (err, jobs) {
    //console.log(jobs)
    const result = jobs
    if (err) return res.status(500).json({ error: err });
    res.json(result)
  })
})
/*
  [정상] Job 정보 업데이트
  : Job 에서 Job._id 이용
*/
router.put('/', (req, res) => {
  Job.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
/*
  [정상] Job 삭제
  : JoinedUser에 저장되어 있는 JobId도 없어져야 함.
*/
router.delete('/:id', async (req, res) => {
  //console.log(req.params.id)
  const session = await startSession();
  try {
    session.startTransaction();
    const jobId = req.params.id;
    const res1=await JoinedUser.updateMany({ jobId: jobId }, { $set: { jobId: null } },{session})
    //console.log(res1)
    const res2=Job.deleteOne({ _id: jobId }, {session})
    //console.log(res2)
    // 트랜젝션 커밋
    await session.commitTransaction();
    // 트랜젝션 종료
    session.endSession();
    res.status(200).json({
      success: true
    })
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ success: false, err });
  }
})


module.exports = router;
