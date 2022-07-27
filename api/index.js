const app = require("express")();
const { v4 } = require("uuid");
var fs = require("fs");
const myApi = require("../mongoose/index");
const mongoose = require("mongoose");

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get("/api/listUsers", (req, res) => {
  console.log(__dirname);
  myApi.useCtl.test();
  // fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
  //   console.log(data);
  //   res.end(data);
  // });
});

app.get("/api/listUsers1", function (req, res) {
  console.log("2222");
  res.end("成功");
});

app.get("/api/usertest", function (req, res) {
  // First read existing users.
  myApi.useCtl.test();
  res.end("成功");
});

app.get("/api/dbtest", function (req, res) {
  // First read existing users.
  const db = mongoose.connection;
  mongoose.connect(
    "mongodb+srv://Chenping:Chenping@chenping.a69dt.mongodb.net/cpblog?retryWrites=true&w=majority"
  );
  db.once("open", () => {
    console.log("链接成功1");
    res.end("成功1");
  });
  db.once("error", () => {
    console.log("链接失败1");
    res.end("失败1");
  });
});

app.get("/api/dbaddtest", function (req, res) {
  // First read existing users.
  const db = mongoose.connection;
  mongoose.connect(
    "mongodb+srv://Chenping:Chenping@chenping.a69dt.mongodb.net/cpblog?retryWrites=true&w=majority"
  );
  const stuSchema = new mongoose.Schema(
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
});

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
