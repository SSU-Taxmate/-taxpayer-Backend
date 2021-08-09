/*
    DepositProduct 
    - Class에 속함
    : 예금 상품 종류
*/

const mongoose =require('mongoose')

const depositproductSchema = mongoose.Schema({
    name:{/*예금 상품 이름*/
        type:String,
        require:true
    },
    description:{/*설명*/
        type:String,
        default:''
    },
    rate:{/*이율(%)*/
        type:Number,
        default:0
    },

})
const DepositProduct = mongoose.model('DepositProduct', depositproductSchema)

module.exports = {DepositProduct}

