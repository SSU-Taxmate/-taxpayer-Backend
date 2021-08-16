/*
    BudgetHistory
    :  Budget History내역
*/
const mongoose = require('mongoose')

const budgethistorySchema = mongoose.Schema({
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget'
    },
    transactionType: [{/*어떤 행동 세입:0, 세출:1, 벌금:2 | level2 */
        type: Number,
        require: true
    }],
    amount: {/* 얼마나 */
        type: Number,
        require: true
    },
    date: {/* 언제 */
        type: Date,
        default: Date.now
    }
})
const BudgetHistory = mongoose.model('BudgetHistory', budgethistorySchema)
module.exports = {BudgetHistory}
