const mongoose =require('mongoose')
/*
    [추후 업데이트] Homework
    : 과제
*/
const homeworkSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    detail:{
        type:String,
    },
    expDate:{/*deadline : 기본7일 */
        type: Date,
        default:() => new Date(+new Date() + 7*24*60*60*1000)
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    }
})

const Homework = mongoose.model('Homework', homeworkSchema)

/*
    [추후 업데이트] GrantedHomework
    : Student와 Homework를 연결짓는 Schema
*/
const grantedhomeworkSchema= mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'JoinedUser'
    },
    homeworkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    submission:{/*제출여부 : true,false*/
        type:Boolean,
        default:null
    },
    withinDeadline:{/*기한 내 제출 : true,false,null*/
        type:Boolean,
        default:null
    },
    couponId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
        default: null
    }
})
const GrantedHomework = mongoose.model('GrantedHomework', grantedhomeworkSchema)

module.exports = {Homework ,GrantedHomework}

