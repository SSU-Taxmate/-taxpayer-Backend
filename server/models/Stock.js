const mongoose =require('mongoose')
/*
    Stock
 */
const stockSchema = mongoose.Schema({
    stockName:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        default:''
    },
    prices:[{
        updateDate:{
            type:Date,
            unique:true,
            default:Date.now
        },
        value:{
            type:Number,
            required:true
        },
        hint:{
            type:String,
            default:''
        }
    }]
      
})
const Stock = mongoose.model('Stock', stockSchema)
/*
    ClassStock
    : Class와 Stock을 연결짓는 Schema
*/
const classstockSchema=mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    stockId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stock'
    },
    createdAt:{/*상장일*/
        type:Date,
        default:Date.now 
    }
})
const ClassStock=mongoose.model('ClassStock',classstockSchema)
module.exports = {Stock ,ClassStock}