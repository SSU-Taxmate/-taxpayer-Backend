const mongoose =require('mongoose')
const taxPriceSchema=mongoose.Schema({
    updateDate:{
        type:Date,
        unique:true,
    },
    value:{
        type:Number,
        default: 10000
    },
    hint:{
        type:String,
        default:''
    }
})
const stockSchema = mongoose.Schema({
    stockName:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
    },
    prices:[taxPriceSchema]
      
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = {Stock }