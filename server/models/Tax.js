const mongoose = require('mongoose')
/*
    Tax
*/
const taxSchema = mongoose.Schema({
    typename: {
        type: String,
    },
    valtype: {
        type: String,
    },
    value: {
        type: Number
    }
    , date: {
        type: Date,
        default: Date.now
    }
})
const Tax = mongoose.model('Tax', taxSchema)
/*
    ClassTax
    : Class와 Tax를 연결짓는 Schema
*/
const classtaxSchema = mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    taxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax'
    }
})
const ClassTax = mongoose.model('ClassTax', classtaxSchema)



module.exports = { Tax, ClassTax }