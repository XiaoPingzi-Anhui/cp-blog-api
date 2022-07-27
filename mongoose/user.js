const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//创建Schema对象（约束）
const stuSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: {
      type: String,
      default: "male",
    },
    addr: String,
    address: String,
  },
  { timestamps: true } // 当 schema 中设置timestamps为 true 时，schema映射的文档 document 会自动添加 createdAt 和 updatedA t这两个字段，代表创建时间和更新时间
);

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成
const stuModle = mongoose.model("student", stuSchema);

exports.stuModle = stuModle;

//向student数据库中插入数据
stuModle.create(
  {
    name: "小明",
    age: "20",
    addr: "天津",
    address: "合肥",
  },
  (err, docs) => {
    if (!err) {
      console.log("插入成功" + docs);
    }
  }
);
