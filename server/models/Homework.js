const mongoose =require('mongoose')
const homeworkTypeSchema = mongoose.Schema({
  /*  _id:{
        type:String,
    },*/
    typeName:{
        type:String,
    },
    detail:{
        type:String
    }

})
const HomeworkType = mongoose.model('HomeworkType', homeworkTypeSchema)

const homeworkSchema = mongoose.Schema({
    homeworkType:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'HomeworkType',
    },
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
        type: String, 
        ref: User
    },*/
    submit:{
        type:Boolean,
        default:false
    },/*
    coupon_id:{
        type:String,
        default: null
    }*/
    
})

const Homework = mongoose.model('Homework', homeworkSchema)

module.exports = {Homework,HomeworkType }