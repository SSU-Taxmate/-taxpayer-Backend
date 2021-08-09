/* base URL
  : /api/jobs
*/
const express = require('express');
const { Job } = require('../models/Job');
const router = express.Router();

/*
  [정상] Job 생성
  {classId: , Job정보들~}
*/
router.post('/', (req, res) => {
    console.log('job post', req.body)
    const newJob = new Job(req.body);
    newJob.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

/*
  [정상] Job 불러오기
  : Job에서 classId 이용. {classId:}
*/
router.get('/', (req, res) => {
    console.log('job get', req.query)
    Job.find(req.query, function (err, jobs) {
        console.log(jobs)
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
  [] Job 삭제
  : Job
*/
router.delete('/', (req, res) => {
    Job.deleteOne({_id:req.body._id},{},(err,doc)=>{
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
})


module.exports = router;
