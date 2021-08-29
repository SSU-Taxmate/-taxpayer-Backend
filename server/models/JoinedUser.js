const mongoose = require('mongoose')
/*
    JoinedUser (예전JoinClass)
    : Class와 Student를 연결하는 Schema
*/
const joineduserSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    userId:{//student
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    alias:{//동명이인 위해서
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
    /*account - JoinedUser._id로 Account에서 찾기*/
    
    /* holdingStocks 
    - JoinedUser._id로 StockAacount에서 찾기*/
   
})
const JoinedUser=mongoose.model('JoinedUser',joineduserSchema);
module.exports = { JoinedUser}