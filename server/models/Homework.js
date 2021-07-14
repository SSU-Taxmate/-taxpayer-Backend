const mongoose =require('mongoose')

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

module.exports = {Homework }