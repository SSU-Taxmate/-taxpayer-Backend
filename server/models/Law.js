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
    initiator:{/*발의자-정부 or 국회의원10인이상*/
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    state:{ /* 투표중=>[발의]=>본회의심의=>[의결]=>대통령거부권행사=>[공포]*/
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