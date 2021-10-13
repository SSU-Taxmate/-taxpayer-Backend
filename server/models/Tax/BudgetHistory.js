/*
    BudgetHistory
    :  Budget History내역 - 한달마다 업데이트
    => 삭제하기.
*/
const mongoose = require('mongoose')

const budgethistorySchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    transType: {/*세입:0, 세출:1, 국채발행:2 */
        type: Number,
        require: true
    },
    amount: {/* 양 */
        type: Number,
        require: true
    },
    date: {/* 언제-매월1일자정 */
        type: Date,
        default: Date.now
    },
})
const BudgetHistory = mongoose.model('BudgetHistory', budgethistorySchema)
module.exports = {BudgetHistory}
