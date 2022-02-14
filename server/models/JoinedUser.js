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

})
const JoinedUser=mongoose.model('JoinedUser',joineduserSchema);
module.exports = { JoinedUser}