/*
    JoinDeposit 
    : 학생은 하나의 예금에만 가입할 수 있다.
*/

const mongoose =require('mongoose')

const joindepositSchema = mongoose.Schema({
    productId:{/*어떤 상품을*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'DepositProduct'
    },
    studentId:{/*어떤 학생이 가입하였는가*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'JoinedUser'
    }   

})
const JoinDeposit = mongoose.model('JoinDeposit', joindepositSchema)

module.exports = {JoinDeposit}

