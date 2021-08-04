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
    expDate:{
        type: Date
    },
    detail:{
        type:String,
    },
    /*student_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    },*/
    submit:{
        type:Boolean,
        default:false
    },
    coupon_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
        default: null
    }/**/
    
})

const Homework = mongoose.model('Homework', homeworkSchema)
/*
    ClassHomework
    : Class와 Homework를 연결짓는 Schema
*/
const classhomeworkSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    homeworkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    }
})
const ClassHomework = mongoose.model('ClassHomework', classhomeworkSchema)

module.exports = {Homework ,ClassHomework}