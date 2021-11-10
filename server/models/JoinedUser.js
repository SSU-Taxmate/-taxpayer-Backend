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
    userId:{/*학생 계정정보*/
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    alias:{/*동명 이인*/
        type:String,
        default:''
    },
/*
    클래스에 속한 student가 갖는 고유 정보 
*/
    jobId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        default:null
    }],
    /*creditRating - */
    /*account - JoinedUser._id로 Account에서 확인*/
    /* holdingStocks 
    - JoinedUser._id로 StockAacount에서 확인*/
   
})
const JoinedUser=mongoose.model('JoinedUser',joineduserSchema);
module.exports = { JoinedUser}