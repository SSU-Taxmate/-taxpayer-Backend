const mongoose =require('mongoose')
const classsetSchema=mongoose.Schema({
    updatedate:{
        type:Date,
    },
    SetTax_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SetTax'
    },
    Stock_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stock'
    },
    jobset:[
        
    ]
})
const classSchema = mongoose.Schema({
    classno:{
        type:Number,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:null,
    },
    comment:{
        type:String,
        default:""
    },
    year:{
        type:Date,
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    classset:[classsetSchema],
    
      
})

const Class = mongoose.model('Class', classSchema)

module.exports = {Class }