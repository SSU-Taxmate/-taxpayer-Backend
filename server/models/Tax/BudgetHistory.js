/*
    BudgetHistory
    :  Budget History내역 - 한달마다 업데이트
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
    memo:{/*벌금(세입일부), 소득세, 부동산세, 자리세, 부가가치세, 인지세, 증권거래세, 문화비, 교육비, 환경미화비*/
        type:String,
        default:''
    }
})
const BudgetHistory = mongoose.model('BudgetHistory', budgethistorySchema)
module.exports = {BudgetHistory}
