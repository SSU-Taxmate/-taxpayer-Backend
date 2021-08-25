const mongoose = require('mongoose')
/*
    Class
*/
const classSchema = mongoose.Schema({
    /*참가코드*/
    entrycode: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    teacherId: {/*owned*/
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },

})
const Class = mongoose.model('Class', classSchema)


module.exports = { Class }