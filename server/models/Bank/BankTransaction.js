/*
    BankTransaction 
    : 은행 거래 데이터
*/

const mongoose =require('mongoose')

const banktransactionSchema = mongoose.Schema({
   accountId:{
    type:mongoose.Schema.Types.ObjectId,
    },
   transactionType:{/*입금:0, 출금:1*/

   },
   amount:{

   }
})
const BankTransaction = mongoose.model('BankTransaction', banktransactionSchema)

module.exports = {BankTransaction}

