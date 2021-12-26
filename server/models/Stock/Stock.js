const mongoose =require('mongoose')
/*
    Stock
    : 주식
 */
const stockSchema = mongoose.Schema({
    stockName:{/* 주식명 */
        type:String,
        required:true,
    },
    description:{/* 설명 */
        type:String,
        default:''
    },
    prices:[{/* Daily 가격 정보, 금액, 힌트 */
        updateDate:{
            type:Date,
            default:Date.now
        },
        value:{
            type:Number,
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
        default:new Date(9999,12,29)
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