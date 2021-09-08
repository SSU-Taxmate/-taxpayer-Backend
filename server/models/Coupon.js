const mongoose =require('mongoose')
/*
    [추후 업데이트] Coupon
*/
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
/*
    ClassCoupon
    : Class와 Coupon을 연결짓는 Schema
*/
const classcouponSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }
})

const ClassCoupon = mongoose.model('ClassCoupon', classcouponSchema)

module.exports = {Coupon ,ClassCoupon}