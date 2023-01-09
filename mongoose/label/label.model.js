const mongoose = require("mongoose");

/** 标签表 */
const labelSchema = new mongoose.Schema({
  /** 标签名 */
  labelName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("label", labelSchema);
