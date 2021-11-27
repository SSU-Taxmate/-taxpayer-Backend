const mongoose =require('mongoose')
/*
    PayBill
    : 월급 명세서_클래스 생성될때 추가
*/
const paybillSchema = mongoose.Schema({
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required:true
    },
    employees:[{
        joinedUser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'JoinedUser',
            required:true
        },
        jobname:{
            type:String,
            required:true
        },
        payedDate:{
            type:Date
        },
        payment:{
            type:Number,
            default:0
        }
    }]
})

const PayBill = mongoose.model('PayBill', paybillSchema)
module.exports = { PayBill}