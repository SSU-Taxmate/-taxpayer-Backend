const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    /*참가코드*/
    entrycode: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: ""
    },
    year: {
        type: Date,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    settings: {/*클래스 세팅 정보*/
        updatedate: {
            type: Date,
        },
        SetTax_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SetTax'
        },
        stocks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }],
        jobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }]
    }

})

const Class = mongoose.model('Class', classSchema)

module.exports = { Class }