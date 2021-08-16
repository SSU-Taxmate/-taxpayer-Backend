/*
    AccountTransaction 
    : 은행 거래 데이터
*/

const mongoose =require('mongoose')

const AccountTransactionSchema = mongoose.Schema({
   accountId:{/*어떤 통장에서 */
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        require:true
    },
   transactionType:{/*어떤 행동 - 입금(1) 출금(0)*/
        type:Number,
        require:true
   },
   amount:{/* 얼마나 */
    type:Number,
    require:true
   },
   date:{/* 언제 */
       type:Date,
       default:Date.now
   },
   memo:{/* 간단한 메모 */
       type:String
   }
})
const AccountTransaction = mongoose.model('AccountTransaction', AccountTransactionSchema)

module.exports = {AccountTransaction}

