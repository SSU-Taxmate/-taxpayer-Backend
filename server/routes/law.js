/* base URL
  : /api/laws
*/
const express = require('express');
const { Law } = require('../models/Law/Law');
const router = express.Router();
//create - classlaw에도 저장을 해야 함.
/*
  [정상] Law 생성
  : Law
*/
router.post('/', (req, res) => {
        const laws = new Law(req.body);
        laws.save((err, doc) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true })
        })
    })
    /*
      [정상] Class별 Law 모두 보여주기
      : Law
        - req.query {classId:}
    */
router.get('/', (req, res) => {
        Law.find(req.query, (err, classlaw) => {
            const result = classlaw
            if (err) return res.status(500).json({ error: err });
            res.json(result)
        })
    })
    /*
      [정상] Law수정
      : Law
    */
router.put('/', (req, res) => {
        Law.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            })
        })

    })
    /*
      [정상] Law 삭제 : deleteOne
    */
router.delete('/:id', (req, res) => {
    const lawId = req.params.id
    Law.deleteOne({ _id: lawId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
})

module.exports = router;