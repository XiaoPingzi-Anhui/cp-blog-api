const app = require("express")();
const { v4 } = require("uuid");
var fs = require("fs");
const myApi = require("../mongoose/index");

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

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
