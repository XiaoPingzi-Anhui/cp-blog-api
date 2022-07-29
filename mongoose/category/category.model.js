const mongoose = require("mongoose");

/** 标签表 */
const CategorySchema = new mongoose.Schema({
  /** 标签名 */
  categoryName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("category", CategorySchema);
