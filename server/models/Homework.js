const mongoose =require('mongoose')
const homeworkTypeSchema = mongoose.Schema({
  /*  _id:{
        type:String,
    },*/
    type:{
        type:String,
    },
    detail:{
        type:String
    }

})
const HomeworkType = mongoose.model('HomeworkType', homeworkTypeSchema)

const homeworkSchema = mongoose.Schema({
    homeworkType_id:{
        type: String, 
        ref: 'HomeworkType'
    },
    name: {
        type: String,
        maxlength: 50
    },
    date:{
        type:Date
    },
    expDate:{
        type: Date
    },
    detail:{
        type:String,
    },
    student_id:{
        type: String, 
        ref: 'User'
    },
    submit:{
        type:Boolean,
        default:false
    },
    coupon_id:{
        type:String,
    }
    
})

const Homework = mongoose.model('Homework', homeworkSchema)

module.exports = {Homework,HomeworkType }