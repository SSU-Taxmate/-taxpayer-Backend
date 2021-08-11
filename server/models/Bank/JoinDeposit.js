/*
    JoinDeposit 
    : 학생은 하나의 예금에만 가입할 수 있다.
*/

const mongoose =require('mongoose')

const joindepositSchema = mongoose.Schema({
    productId:{/*어떤 상품을*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'DepositProduct',
        require:true
    },
    studentId:{/*어떤 학생이 가입하였는가*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'JoinedUser',
        require:true
    },
    /*해지시 돈 받을 통장 - 학생1=통장1이기에 없어도 됨
    accountId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        require:true
    },*/
    assets:{/*얼마나 예금하였는가*/
        type:Number,
        require:true
    },
    //가입일 - 항상 해지시점과 비교해서 rate 구하기
    createdAt:{
        type:Date,
        default:Date.now
    },
    //해지 시점
    closedAt:{
        type:Date
    },
    isClosed:{//해지되었는가 - 해지되었다면, 한달에 한번 싹다 없애버리자
        type:Boolean,
        default:false
    }
    
})
const JoinDeposit = mongoose.model('JoinDeposit', joindepositSchema)

module.exports = {JoinDeposit}

