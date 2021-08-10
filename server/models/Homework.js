const mongoose =require('mongoose')
/*
    Homework
*/
const homeworkSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    detail:{
        type:String,
    },
    expDate:{
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
    GrantedHomework
    : Student와 Homework를 연결짓는 Schema
*/
const grantedhomeworkSchema= mongoose.Schema({
    studentId:{/*반드시 JoinedUser*/
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'JoinedUser'
    },
    homeworkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    submission:{//제출여부, true, false,
        type:Boolean,
        default:null
    },
    withinDeadline:{//기한 내 제출,true,false,null
        type:Boolean,
        default:null
    },
    coupon_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
        default: null
    }
})
const GrantedHomework = mongoose.model('GrantedHomework', grantedhomeworkSchema)

module.exports = {Homework ,GrantedHomework}

