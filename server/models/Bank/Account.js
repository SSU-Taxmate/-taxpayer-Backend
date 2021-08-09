const mongoose =require('mongoose')
/*
    Account
    : Student 각각이 가지고 있는 Account 1개
*/
const accountSchema = mongoose.Schema({
    studentId:{/*반드시 JoinedUser*/
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'JoinedUser'
    },
    name:{
        type:String,
        default:function(){return'학생 계좌'+this.studentId}
    },
    currentBalance:{
        type:Number,
        default:0
    }
})
const Account = mongoose.model('Account', accountSchema)

/*
    ClassAccount
    : Class 각각이 가지고 있는 Account
    Class 만들때 생성
*/
const classaccountSchema = mongoose.Schema({
    classId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class'
    },
    currentBalance:{
        type:Number,
        default:0
    }
})

const ClassAccount = mongoose.model('ClassAccount', classaccountSchema)

module.exports = {Account ,ClassAccount}

