const mongoose =require('mongoose')
/*
    Homework
*/
const homeworkSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    date:{
        type:Date,
       // default:Date.now
    },
    detail:{
        type:String,
    },
    expDate:{
        type: Date,
        default:Date.now
    },
    withinDeadline:{//과제기간(true), 과제제출후(false)
        type:Boolean,
        default:true
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
    studentId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    homeworkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    submission:{//제출여부
        type:Boolean,
        default:false
    },
    coupon_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
        default: null
    }
})
const GrantedHomework = mongoose.model('GrantedHomework', grantedhomeworkSchema)

module.exports = {Homework ,GrantedHomework}

