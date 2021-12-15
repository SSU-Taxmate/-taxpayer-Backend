/*
    Budget[이번달]
    :한달마다 새로 만들기.
    : 전달 기록은 남긴다.
    Class 만들때 초기 값만 자동 생성
*/
const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    month:{
        type:Number,
        required:true
    },
    revenue: { // 이번달 세입현황(과거 budget& 종류 축소)
        income: { //소득세
            type: Number,
            default: 0
        },
        realestate: { //부동산세
            type: Number,
            default: 0
        },
        vat: { //부가가치세
            type: Number,
            default: 0
        },
        stock: { //증권거래세
            type: Number,
            default: 0
        },
        fine: { //벌금
            type: Number,
            default: 0
        }
    },
    debet: { // 이번달 국채
        type: Number,
        default: 0
    },
    expenditure: { // 이번달 세출현황
        culture: {//문화비
            type: Number,
            default: 0
        },
        education: {//교육비
            type: Number,
            default: 0
        },
        environment: {//환경미화비
            type: Number,
            default: 0
        },
        etc: {//기타
            type: Number,
            default: 0
        }
    }

})
const Budget = mongoose.model('Budget', budgetSchema)
module.exports = { Budget }