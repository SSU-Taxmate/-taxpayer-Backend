
/*
    Budget
    : Class 각각이 가지고 있는 Budget Account
    Class 만들때 생성O
    한달마다 BudgetHistory로 옮기고 없애자
*/
const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    balance: {//보유세금
        income: {//소득세
            type: Number,
            default: 0
        },
        realestate: {//부동산세
            type: Number,
            default: 0
        },
        place: {//자리세
            type: Number,
            default: 0
        },
        electric: {//전기세
            type: Number,
            default: 0
        },
        stamp: {//인지세
            type: Number,
            default: 0
        },
        vat: {//부가가치세
            type: Number,
            default: 0
        },
        stock: {//증권거래세
            type: Number,
            default: 0
        }
    },
    debet: {//국채
        type: Number,
        default: 0
    },
    expenditure: {//세출현황
        culture: {
            type:Number,
            default:0
        },
        education:{
            type:Number,
            default:0
        },
        environment:{
            type:Number,
            default:0
        },
        etc:{
            type:Number,
            default:0
        }
    }

})
const Budget = mongoose.model('Budget', budgetSchema)
module.exports = { Budget }
