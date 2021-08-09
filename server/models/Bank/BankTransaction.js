/*
    BankTransaction 
    : 은행 거래 데이터
*/

const mongoose =require('mongoose')

const banktransactionSchema = mongoose.Schema({
   accountId:{

   },
   transactionType:{/*예금, 출금*/

   },
   amount:{

   }
})
const BankTransaction = mongoose.model('BankTransaction', banktransactionSchema)

module.exports = {BankTransaction}

