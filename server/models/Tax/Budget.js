/*
    Budget
    : Class 각각이 가지고 있는 Budget Account
    Class 만들때 생성O
*/
const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    classId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class'
    },
    currentBalance:{//보유세금
        type:Number,
        default:0
    }
})
const Budget = mongoose.model('Budget', budgetSchema)
