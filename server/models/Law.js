const mongoose =require('mongoose')

const lawSchema = mongoose.Schema({
    issuedate:{
        type:Date,
        default: Date.now
    },
    title:{
        type:String,
        unique : true ,
        trim : true 
    },
    content:{
        type:String
    }
      
})

const Law = mongoose.model('Law', lawSchema)

module.exports = {Law }