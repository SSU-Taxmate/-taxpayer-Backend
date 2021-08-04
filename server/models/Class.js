const mongoose = require('mongoose')
/*
    Class
*/
const classSchema = mongoose.Schema({
    /*참가코드*/
    entrycode: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    teacher: {/*owned*/
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    /*
    //joinClass로 필요없어짐.
    students: [{//participate
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    //클래스 세팅 정보 Mapping Table을 두면
    //필요없는 거 아닌가?
    settings: {
        stocks:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassStock'
        },
        taxes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassTax'
        },
        laws:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassLaw'
        },
        coupons:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassCoupon'
        },
        homeworks:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassHomework'
        },
        jobs: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassJob'
        },
    }*/

})
const Class = mongoose.model('Class', classSchema)

/*
    JoinClass
    : Class와 Student를 연결짓는 Schema
*/
const joinClassSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const JoinClass=mongoose.model('JoinClass',joinClassSchema);
module.exports = { Class ,JoinClass}