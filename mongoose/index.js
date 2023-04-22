const mongoose = require("mongoose");
const db = mongoose.connection;
console.log("env", process.env.DB_URL);
mongoose.connect(process.env.DB_URL);
db.once("open", () => {
  console.log("链接成功");
});
db.once("error", () => {
  console.log("链接失败");
});

const userCtl = require("./user/user.controller");
const articleCtl = require("./article/article.controller");
const categoryCtl = require("./category/category.controller");
const labelCtl = require("./label/label.controller");

module.exports = { userCtl, articleCtl, categoryCtl, labelCtl };
