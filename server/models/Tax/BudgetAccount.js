
/*
    BudgetAccount[국가계좌]
    : Class 각각이 가지고 있는 Budget Account
    Class 만들때 생성O
    한달마다 BudgetHistory로
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
