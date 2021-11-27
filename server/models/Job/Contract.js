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
    job:{//직업
        type:Object,
        ref:'Job',
        required:true
    },
    payday:{//일
        type:Number,
        default:1
    },
    exp:{//고용만료일
        type:Date,
        default:new Date(9999,12,29)
    }
    

},{timestamps:true})
const Contract = mongoose.model('Contract', contractSchema)
module.exports = { Contract}