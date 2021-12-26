/*
    JoinDeposit 
    : 학생은 하나의 예금에만 가입할 수 있다.
*/

const mongoose =require('mongoose')

const joindepositSchema = mongoose.Schema({
    productId:{/*가입 상품*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Deposit',
        require:true
    },
    studentId:{/*가입인*/
        type: mongoose.Schema.Types.ObjectId, 
        ref:'JoinedUser',
        require:true
    },
    amount:{/*예금 금액*/
        type:Number,
        require:true
    },
    createdAt:{/* 가입일 : 해지시점과 비교해서 interestRate를 구한다 */
        type:Date,
        default:Date.now
    },
    closedAt:{/*해지 시점 */
        type:Date
    },
    isClosed:{/*해지 여부 - 한달에 한번 true 없앤다*/
        type:Boolean,
        default:false
    }
    
})
const JoinDeposit = mongoose.model('JoinDeposit', joindepositSchema)

module.exports = {JoinDeposit}

