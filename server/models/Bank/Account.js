const mongoose =require('mongoose')
/*
    Account
    : Student 각각이 가지고 있는 Account (1개)
*/
const accountSchema = mongoose.Schema({
    studentId:{/*해당 Class내 User에 대한 정보*/
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'JoinedUser'
    },
    alias:{/*별칭*/
        type:String,
        default:''
    },
    currentBalance:{/*현재보유금액*/
        type:Number,
        default:0
    },
    purpose:{/*일반 user(0), 개인 사업자(1)*/
        type:Number,
        default:0
    }//[추후] 1은 마켓 개설시 자동으로 만들어진다.
})
const Account = mongoose.model('Account', accountSchema)

module.exports = {Account}

