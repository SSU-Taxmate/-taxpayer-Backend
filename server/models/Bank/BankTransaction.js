/*
    BankTransaction 
    : 은행 거래 데이터
*/

const mongoose =require('mongoose')

const banktransactionSchema = mongoose.Schema({
   accountId:{/*어떤 통장에서 */
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        require:true
    },
   transactionType:{/*어떤 행동이 입금:0, 출금:1*/
        type:Boolean,
        require:true
   },
   amount:{/* 얼마나 */
    type:Number,
    require:true
   },
   createdAt:{/* 언제 */
       type:Date,
       default:Date.now
   }
})
const BankTransaction = mongoose.model('BankTransaction', banktransactionSchema)

module.exports = {BankTransaction}

