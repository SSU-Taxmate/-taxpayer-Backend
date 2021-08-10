/*
    DepositProduct 
    - Class에 속함
    : 예금 상품 종류
*/

const mongoose =require('mongoose')

const depositproductSchema = mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },
    name:{/*예금 상품 이름*/
        type:String,
        require:true
    },
    description:{/*설명*/
        type:String,
        default:''
    },
    rate:{/*기본 이율(%) : 최소 가입 기간을 지켰을 때*/
        type:Number,
        default:0,
    },
    minAmount:{/* 최소 가입 금액 */
        type:Number,
        default:0
    },
    minduration:{/* 최소 가입 기간(day)- 이전에는 원금만 받고, 이후는 가입금액*rate */
        type:Number,
        require:true
    },
    maxduration:{/*최대 가입 기간(day)*/
        type:Number,
        require:true
    },
    rateBasedDuration:[{/*기간 별 이율-최소 가입기간==최대가입기간=>해당없음*/
        rate:{
            type:Number,
            require:true
        },
        duration:{/*최소 가입 기간 이후 ~ 최대 가입 기간 이전 (**일 이상)*/
            type:Number,
            require:true
        }
    }]
})
const DepositProduct = mongoose.model('DepositProduct', depositproductSchema)

module.exports = {DepositProduct}

