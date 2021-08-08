const mongoose = require('mongoose')
/*
    Class
*/
const classSchema = mongoose.Schema({
    /*참가코드*/
    entrycode: {
        type: String,
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
    teacherId: {/*owned*/
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },

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