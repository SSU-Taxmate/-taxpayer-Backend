/*
    Deposit
    : 예금 상품 종류
*/

const mongoose =require('mongoose')

const depositSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        require:true
    },
    name:{/*예금 상품 이름*/
        type:String,
        require:true
    },
    description:{/*설명*/
        type:String,
        default:''
    },
    interestRate:{/*기본 이율(%) : 최소 가입 기간을 지켰을 때*/
        type:Number,
        default:0,
    },
    minAmount:{/* 최소 가입 금액 - 이상 */
        type:Number,
        default:1
    },
    minDuration:{/* 최소 가입 기간(day)- 이전에는 원금만 받고, 이후는 가입금액*rate */
        type:Number,
        require:true
    },
    joinPossible:{/*신규가입가능여부*/
        type:Boolean,
        default:true,
    }
})
const Deposit = mongoose.model('Deposit', depositSchema)

module.exports = {Deposit}

