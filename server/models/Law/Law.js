const mongoose =require('mongoose')
/*
    Law
*/
const lawSchema = mongoose.Schema({
    title:{/*unique true 없애고 검사하는 로직 추가하기 */
        type:String,
        unique : true ,
        trim : true 
    },
    content:{
        type:String
    },
    initiator:{/*삭제 : 발의자-정부 or 국회의원10인이상*/
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    state:{ // 삭제 : real <= vote <= suggest 
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