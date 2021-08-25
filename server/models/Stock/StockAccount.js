const mongoose = require('mongoose')
/*
    StockAccount
    : 내 보유 주식
 */
const stockaccountSchema = mongoose.Schema({
    studentId: {//StockAccount 보유자
        type:mongoose.Schema.Types.ObjectId,
        ref:'JoinedUser',
        require:true
    },
    holdingStocks: [{
        stockId: {// 이용해서 Stock 테이블에서 stockName,prices로 현재가 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        },
        quantity: {// 총 보유 주식 수
            type: Number,
        },
        allPayAmount: {//이 주식에 투자한 총 금액 : SUM(price*quantity*(100+taxRate)/100)
            type: Number,
        },
    }]
}, { timestamps: true })
const StockAccount = mongoose.model('StockAccount', stockaccountSchema)
module.exports = { StockAccount }
// <매수>
// 은행 잔고 확인
// 1) holdingStocks에 stockId가 있다면
//      qunatity+=StockOrderHistory.quantity
//      allPayAmount+=StockOrderHistory.payAmount
// 2) 없다면
//      quantity=StockOrderHistory.quantity
//      allPayAmount=StockOrderHistory.payAmount

// <매도>
// qunatity-=매도수량
// allPayAmount-=(현재가*매도수량)

// <내 보유 주식>
// 잔고(stockId이용) : StockAccount.quantity 
// 평가손익 : 평가금액-allPayAmount 
// 평가금액 : 잔고(StockAccount.qunatity) * 현재가(Stock의 prices[-1])
// 수익률 : 평가손익/투자총액(StockAccount.allPayAmount)
// 평균 매입가 : StockAccount.allPayAmount/StockAccount.quantity
// 현재가 : 현재가(Stock.prices[-1])
