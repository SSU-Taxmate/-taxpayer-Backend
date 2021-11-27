const mongoose = require('mongoose')
/*
    JoinedUser
    : Class에 속해있는 Student
*/
const joineduserSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    //role 추가 
    userId:{/*학생 계정정보*/
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    alias:{/*동명 이인*/
        type:String,
        default:''
    },

    /*creditRating - */
    /*account - JoinedUser._id로 Account에서 확인*/
    /* holdingStocks 
    - JoinedUser._id로 StockAacount에서 확인*/
   
})
const JoinedUser=mongoose.model('JoinedUser',joineduserSchema);
module.exports = { JoinedUser}