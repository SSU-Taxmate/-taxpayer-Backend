const mongoose = require('mongoose')
/*
    Contract
    : 계약서
*/
const contractSchema = mongoose.Schema({ /*해당 클래스의 job */
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required:true
    },
    joinedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JoinedUser',
        required:true
    },
    jobId:{//직업
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
},{timestamps:true})
const Contract = mongoose.model('Contract', contractSchema)
module.exports = { Contract}