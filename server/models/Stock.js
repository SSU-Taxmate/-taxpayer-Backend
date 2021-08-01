const mongoose =require('mongoose')
const stockSchema = mongoose.Schema({
    stockName:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
    },
    prices:[{
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
    }]
      
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = {Stock }