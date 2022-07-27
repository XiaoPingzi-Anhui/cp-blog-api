const app = require("express")();
const { v4 } = require("uuid");
var fs = require("fs");

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

app.get("/api/listUsers", function (req, res) {
  console.log(__dirname);
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

app.get("/api/addUser", function (req, res) {
  // 读取已存在的数据
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

app.get("/api/:id", function (req, res) {
  // 首先我们读取已存在的用户
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    var user = data["user" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

var id = 2;

app.get("/api/deleteUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["user" + id];

    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
