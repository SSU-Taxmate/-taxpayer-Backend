const mongoose = require('mongoose')
    /*
        LawSuggest
    */
const lawSuggestSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    content: {
        type: String
    },
    initiator: { /*발의자-정부 or 국회의원10인이상*/
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: { /* 투표중=>[발의]=>본회의심의=>[의결]=>대통령거부권행사=>[공포]*/
        type: String,
        default: 'suggest-law'
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    vote: [{
        initiator: { /*동의한 사람-학생의 ID꼴로저장*/
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        value: { /*학생의 찬성반대표현*/
            type: Boolean,
        }
    }]

}, { timestamps: true }) /*이후 청원기간에 사용할것임*/

const LawSuggest = mongoose.model('LawSuggest', lawSuggestSchema)

module.exports = { LawSuggest }