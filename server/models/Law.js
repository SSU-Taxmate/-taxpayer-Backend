const mongoose =require('mongoose')
/*
    Law
*/
const lawSchema = mongoose.Schema({
    title:{
        type:String,
        unique : true ,
        trim : true 
    },
    content:{
        type:String
    },
    state:{ /* 발의, 투표 중,  진짜 법*/
        type:String,
        default:'real-law'
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }
}, 
{ timestamps: true })

const Law = mongoose.model('Law', lawSchema)

/*
    ClassLaw
    : Class와 Law를 연결짓는 Schema

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
*/
module.exports = {Law }