const mongoose =require('mongoose')
/*
    PayBill
    : 월급 명세서_한 클래스에 하나 존재
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
        payrequired:{
            type:Boolean,
            default:true
        },
        payment:{
            type:Number,
            default:0
        }
    }]
})

const PayBill = mongoose.model('PayBill', paybillSchema)
