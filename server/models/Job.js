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
    period:{/*고용기간 endDate*/
        type:Date,
        default:() => new Date(+new Date() + 7*24*60*60*1000)
    },
    /*Job Posting : 반 정규화*/
    qualification: {/*자격요건*/
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