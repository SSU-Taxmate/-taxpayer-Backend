const mongoose =require('mongoose')

const couponSchema = mongoose.Schema({
    issuedate:{
        type:Date,
        default:Date.now
    },
    use:{
        type:Boolean,
        default:false
    },
    /*student_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
     */
      
})

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = {Coupon }