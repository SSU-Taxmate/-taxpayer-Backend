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
   amount:{/* 거래 금액 */
    type:Number,
    require:true
   },
   afterbalance:{/*거래 후 잔액 */
    type:Number,
    require:true
   },
   date:{/* 거래 시간 */
       type:Date,
       default:Date.now
   },
   memo:{/* 거래 내용 */
       type:String
   }
})
const AccountTransaction = mongoose.model('AccountTransaction', AccountTransactionSchema)

module.exports = {AccountTransaction}

