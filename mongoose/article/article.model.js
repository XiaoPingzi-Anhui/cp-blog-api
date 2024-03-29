const mongoose = require("mongoose");

/** 文章表 */
const ArticleSchema = new mongoose.Schema(
  {
    /** 创建者id */
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    /** 标题 */
    title: {
      type: String,
      required: true,
    },
    /** 主体内容 */
    content: {
      type: String,
      required: true,
    },
    /** 阅读量 */
    readCount: {
      type: Number,
      required: true,
    },
    /** 文章分类 */
    category: {
      type: String,
      required: true,
    },
    /** 点赞数量 */
    likeStar: Number,
    /** 文章标签 */
    labels: {
      type: String,
      required: true,
    },
    /** 仅自己可见 */
    ownSee:{ type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("article", ArticleSchema);
