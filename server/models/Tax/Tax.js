const mongoose = require('mongoose')
/*
    Tax
*/
const taxSchema = mongoose.Schema({
    taxlist:{
        type:Array,
        default: [0,0,0,0,0,0,0]//소득세,부동산세,자리세,전기세,인지세,부가가치세,증권거래세
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Class',
        required:true
    }
})
const Tax = mongoose.model('Tax', taxSchema)


module.exports = { Tax }