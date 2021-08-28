/*
    Fine 벌금!
    DB!
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
  isPayed : {  /* 냈는지 안냈는 지 표기*/
    type:Boolean,
    default:false,
 }

});
const Fine = mongoose.model("Fine", FineSchema); /* 모델 생성 */

module.exports = { Fine };
