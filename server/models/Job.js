const mongoose = require('mongoose')
/*
    Job
*/
const jobSchema = mongoose.Schema({ /*해당 클래스의 job */
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
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
   
    /*Job Posting : 반 정규화*/
    qualification: {/*자격요건-나중업데이트*/
        type: String,
        default: ''
    },
    recruitment: {/*모집 인원*/
        type: Number,
        default: 1
    },
    ondelete:{/*삭제 예정 직업*/
        type:Boolean,
        default:false
    },
    /*직업 apply가능여부는 직업 설정 테이블 이용하기
    joinPossible:{
        type:Boolean,
        default:false
    }*/
},{timestamps:true})
const Job = mongoose.model('Job', jobSchema)
module.exports = { Job}