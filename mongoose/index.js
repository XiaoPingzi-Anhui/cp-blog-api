const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(
  "mongodb+srv://Chenping:Chenping@chenping.a69dt.mongodb.net/cpblog?retryWrites=true&w=majority"
);
db.once("open", () => {
  console.log("链接成功");
});
db.once("error", () => {
  console.log("链接失败");
});

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成
const useCtl = require("./user/user.controller");

module.exports = { useCtl };
