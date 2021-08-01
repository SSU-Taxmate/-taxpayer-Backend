const mongoose =require('mongoose')
/*세금 설정 */
const taxRateSchema=mongoose.Schema({
    typename : {
        type:String,
    },
    valtype:{
        type:String,
    },
    value:{
        type:Number
    }
})
const setTaxSchema=mongoose.Schema({
   setTax:[taxRateSchema]
   ,date:{
       type:Date,
       default:Date.now
   }
})
const SetTax = mongoose.model('SetTax', setTaxSchema)
/* 학생 세금 */
const taxSchema = mongoose.Schema({
    /*TaxType_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TaxType'
   },*/
    date:{
        type:Date,
        default:Date.now
    },
    typename:{
        type:String,
    },
    money:{
        type:Number,
        default:false
    },
    
})

const Tax = mongoose.model('Tax', taxSchema)

module.exports = {Tax,SetTax }