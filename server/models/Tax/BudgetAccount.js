
/*
// 필요하다면, 누적 계산해서 띄우기
: 삭제하자
*/
const mongoose = require('mongoose')

const budgetaccountSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    balance: {// 보유세금
        type: Number,
        default: 0
    },
    debet: {// 국채
        type: Number,
        default: 0
    }

})
const BudgetAccount = mongoose.model('BudgetAccount', budgetaccountSchema)
module.exports = { BudgetAccount }
