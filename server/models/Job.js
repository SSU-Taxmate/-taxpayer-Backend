const mongoose = require('mongoose')
/*
    Job
*/
const jobSchema = mongoose.Schema({ /*해당 클래스의 job */
    name: {/*직업명 */
        type: String,
        unique:true
    },
    salary: {/*예상 월급 */
        type: Number,
    },
    whatdo: {/*하는일 */
        type: String,
        default: ''
    },
    /*고용기간 endDate - 매달1일 정산:월급 주면서 데이터에서 삭제
    period:{
        type:Date,
        default:() => new Date(+new Date() + 7*24*60*60*1000)
    },*/
    /*Job Posting : 반 정규화*/
    qualification: {/*자격요건-나중업데이트*/
        type: String,
        default: ''
    },
    recruitment: {/*모집 인원*/
        type: Number,
        default: 1
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    ondelete:{/*삭제 예정 직업*/
        type:Boolean,
        default:false
    },
    joinPossible:{/*직업 apply가능여부-false=버튼=>true */
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Job = mongoose.model('Job', jobSchema)
/*해당 클래스의 채용공고
const jobPostingSchema = mongoose.Schema({
    jobId: {//직업설명
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    qualification: {//자격요건
        type: String,
        default: ''
    },
    recruitment: {//모집 인원
        type: Number,
        default: 1
    }
})
const PostedJob = mongoose.model('PostedJob', jobPostingSchema)
 */
module.exports = { Job}