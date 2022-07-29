const mongoose = require("mongoose");

/** 标签表 */
const LableSchema = new mongoose.Schema({
  /** 标签名 */
  lableName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("lable", LableSchema);
