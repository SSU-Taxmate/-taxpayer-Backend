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
    alias:{/*별칭 지정*/
        type:String,
        default:''
    },
    currentBalance:{
        type:Number,
        default:0
    }
})
const Account = mongoose.model('Account', accountSchema)



module.exports = {Account}

