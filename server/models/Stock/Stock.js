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
    userDefined:{/*사용자가 만든 stock. 특정 클래스에서만 사용됨.*/
        type:Boolean,
        default:false
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
    }],
    ondelete:{/*상장 폐지 예정 Stock*/
        type:Boolean,
        default:false
    },
    ondeleteDay:{/*상장 폐지 예정 날짜 - 15일*/
        type:Date,
        unique:true,
        default:() => new Date(+new Date() + 15*24*60*60*1000)
    }
  
},{ timestamps: true })
const Stock = mongoose.model('Stock', stockSchema)
/*
    ClassStock
    : Class와 Stock을 연결짓는 Schema - 다른 것은 몰라도 얘는 필요있음
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