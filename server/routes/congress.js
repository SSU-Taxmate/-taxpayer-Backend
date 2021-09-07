/* base URL
  : /api/congress
*/
const express = require('express');
const { LawSuggest } = require('../models/Law_suggest');
const { JoinedUser } = require('../models/JoinedUser')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

/*
  [정상] Suggest_law 생성
  : Suggest_law
*/
router.post('/', (req, res) => {
        const laws = new LawSuggest(req.body);
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

router.get('/', async(req, res) => {
    const classId = req.query.classId
    try {
        const studentnum = await JoinedUser.countDocuments({ 'classId': classId }).exec()

        const lawsuggest = await LawSuggest.aggregate([{
                $match: {
                    "classId": ObjectId(classId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { initiator: '$initiator' },
                    pipeline: [{
                            $match: {
                                $expr: {
                                    $eq: ['$$initiator', '$_id']
                                }
                            }
                        },
                        {
                            $project: {
                                'name': 1
                            }
                        }
                    ],
                    as: 'initiator',
                }
            },
            {
                $unwind: '$initiator'
            },
            {
                $addFields: {
                    'numvoter': { $size: '$vote' },
                    'numpros': {
                        $size: {
                            $filter: {
                                input: '$vote',
                                as: 'voter',
                                cond: {
                                    $eq: ['$$voter.value', true]
                                }
                            }
                        }
                    }
                }
            }

        ])
        const result = { lawsuggest, studentnum: studentnum }
        res.send(result);
    } catch (error) {
        return res.json({ success: false, err });
    }

})

/*
  [정상] Suggest_Law수정
  : Suggest_Law
*/
router.put('/', (req, res) => {
        LawSuggest.updateOne({ _id: req.body._id }, { $set: req.body }, (err, doc) => {
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
    LawSuggest.deleteOne({ _id: lawId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })
})

/*
  [정상] Suggest_law 업데이트
*/
router.post('/agree', (req, res) => {
    console.log(req.body._id);
    LawSuggest.updateOne({ _id: req.body._id }, {
        $push: {
            vote: { initiator: req.body.vote.initiator, value: req.body.vote.value }
        }
    }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
})

router.post('/vote', (req, res) => {
    console.log(req.body._id);
    LawSuggest.updateOne({ _id: req.body._id }, {
        $push: {
            vote: { initiator: req.body.vote.initiator, value: req.body.vote.value }
        }
    }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
})

/*
    SuggestLaw 하나의 vote값만 가져오기
*/
router.get('/:id/vote', (req, res) => {
    console.log(req.body._id);
    LawSuggest.updateOne({ _id: req.body._id }, {
        $push: {
            vote: { initiator: req.body.vote.initiator, value: req.body.vote.value }
        }
    }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
})

module.exports = router;