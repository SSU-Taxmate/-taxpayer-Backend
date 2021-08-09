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

module.exports = {Law }