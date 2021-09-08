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
    state:{ // real-law <= law-vote <= law-suggest 
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