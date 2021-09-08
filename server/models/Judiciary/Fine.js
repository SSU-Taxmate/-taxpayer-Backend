/*
    Fine 
    : 벌금
*/
const mongoose = require("mongoose");

const FineSchema = mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    require: true,
  },
  lawReason: { /* 벌금 사유 (법) */
    type: mongoose.Schema.Types.ObjectId,
    ref: "Law",
    require: true,
  },
  studentId: {  /* 벌금 받는 학생 */  
    type: mongoose.Schema.Types.ObjectId,
    ref: "JoinedUser",
    require: true,
  },
 Amount: { /* 벌금 금액 */
    type: Number,
    require:true,
  },
  isPayed : {  /* 납부 여부 */
    type:Boolean,
    default:false,
 }

});
const Fine = mongoose.model("Fine", FineSchema);

module.exports = { Fine };
