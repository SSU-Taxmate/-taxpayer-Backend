const mongoose = require('mongoose')
/*
    StockOrderHistory
    : stock 매수 기록
 */
const stockorderhistorySchema = mongoose.Schema({
    studentId: {//구매자
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinedUser',
        require: true
    },
    stockId: { /* 매수 주식 */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    },
    quantity:{/* 수량 */
        type:Number,
        require:true
    },
    purchasePrice:{//구입당시가격(매입가) 
        type:Number,
        require:true
    },
    createdAt: {//구입날짜
        type: Date,
        default: Date.now
    },
    payAmount: {// 총 투자 금액 : price*quantity
        type: Number,
        require: true
    },
    
})
const StockOrderHistory = mongoose.model('StockOrderHistory', stockorderhistorySchema)
module.exports = { StockOrderHistory }
