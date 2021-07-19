const mongoose =require('mongoose')
const taxPriceSchema=mongoose.Schema({
    updateDate:{
        type:Date,
        unique:true,
    },
    value:{
        type:Number,
    }
})
const stockSchema = mongoose.Schema({
    stockName:{
        type:String,
        unique:true,
    },
    description:{
        type:String,
    },
    prices:[taxPriceSchema]
      
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = {Stock }