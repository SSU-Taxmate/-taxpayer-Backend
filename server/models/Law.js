const mongoose =require('mongoose')
/*
    Law
*/
const lawSchema = mongoose.Schema({
    issuedate:{
        type:Date,
        default: Date.now
    },
    title:{
        type:String,
        unique : true ,
        trim : true 
    },
    content:{
        type:String
    },
    state:{ /* 발의, 진짜 법, 투표 중 */
        type:String
    }
      
})

const Law = mongoose.model('Law', lawSchema)

/*
    ClassLaw
    : Class와 Law를 연결짓는 Schema
*/
const classlawSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    lawId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Law'
    }
})

const ClassLaw = mongoose.model('ClassLaw', classlawSchema)

module.exports = {Law,ClassLaw }