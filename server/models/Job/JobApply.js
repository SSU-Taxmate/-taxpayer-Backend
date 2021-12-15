const mongoose = require('mongoose')
/*
    JobApply : 직업 지원서
*/
const jobapplySchema = mongoose.Schema({ /*해당 클래스의 job */
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required:true
    },
    joinedUser:{//지원자
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinedUser',
        required:true
    },
    jobId:{//지원한 job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required:true
    },
    state:{
        type:String,
        default: 'ongoing'//reject거절 allow허락 ongoing진행중(=제출한 상태)
    }
},{timestamps:true})
const JobApply = mongoose.model('JobApply', jobapplySchema)
module.exports = { JobApply}