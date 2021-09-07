/* base URL
  : /api/congress
*/
const express = require('express');
const { LawSuggest } = require('../models/Law_suggest');
const router = express.Router();

/*
  [정상] Suggest_law 생성
  : Suggest_law
*/
router.post('/', (req, res) => {
    const laws = new LawSuggest(req.body);
    console.log(laws);
    laws.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

/*
  [정상] Class별 SuggestLaw 모두 보여주기
  : Suggest_Law
    - req.query {classId:}
*/

router.get('/', (req, res) => {
    Law_suggest.find(req.query, (err, classlaw) => {
        const result = classlaw
            //console.log(result)
        if (err) return res.status(500).json({ error: err });
        res.json(result)
    })
})

/*
  [정상] Suggest_Law수정
  : Suggest_Law
*/

router.put('/', (req, res) => {
    Law_suggest.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })

})

/*
  [정상] Suggest_Law 삭제 : deleteOne
*/

router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    const lawId = req.params.id
    Law_suggest.deleteOne({ _id: lawId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
})


module.exports = router;