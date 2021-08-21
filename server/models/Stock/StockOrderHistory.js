const mongoose = require('mongoose')
/*
    StockOrderHistory
    : stock 구입 당시 기록 저장
 */
const stockorderhistorySchema = mongoose.Schema({
    studentId: {//구매자
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinedUser',
        require: true
    },
    stockId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    },
    quantity:{//양
        type:Number,
        require:true
    },
    purchasePrice:{//구입당시가격=매입가 - 필요한 이유 평균매입가
        type:Number,
        require:true
    },
    createdAt: {//구입날짜
        type: Date,
        default: Date.now
    },
    payAmount: {// price*quantity*(100+taxRate)/100
        type: Number,
        require: true
    },
    
})
const StockOrderHistory = mongoose.model('StockOrderHistory', stockorderhistorySchema)
module.exports = { StockOrderHistory }
