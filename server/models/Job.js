const mongoose =require('mongoose')
const jobPostingSchema=mongoose.Schema({/*해당 클래스의 채용공고 */
    job:{/*직업설명*/
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    qualification:{/*자격요건*/
        type:String,
        default:''
    },
    recruitment:{/*모집 인원*/
        type:Number,
        default:1
    }
})
const jobSchema=mongoose.Schema({ /*해당 클래스의 job */
    name:{/*직업명 */
        type:String,
    },
    salary:{/*예상 월급 */
        type:Number,
    },
    description:{/*하는일 */
        type:String,
        default:''
    }
})

const Job=mongoose.model('Job', jobSchema)
module.exports = {Job}