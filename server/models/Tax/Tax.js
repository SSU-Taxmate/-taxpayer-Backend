const mongoose = require('mongoose')
/*
    Tax
*/
const taxSchema = mongoose.Schema({
    taxlist:{
        income:{//소득세
            type:Number,
            default:0
        },
        realestate:{//부동산세
            type:Number,
            default:0
        },
        place:{//자리세
            type:Number,
            default:0
        },
        electric:{//전기세
            type:Number,
            default:0
        },
        stamp:{//인지세
            type:Number,
            default:0
        },
        vat:{//부가가치세
            type:Number,
            default:0
        },
        stock:{//증권거래세
            type:Number,
            default:0
        }
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Class',
        required:true
    }
})
const Tax = mongoose.model('Tax', taxSchema)


module.exports = { Tax }