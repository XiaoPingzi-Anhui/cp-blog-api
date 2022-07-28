const express = require("express");
const bodyParser = require("body-parser");
// const httpStatus = require("http-status");
const myApi = require("../mongoose/index");
const handleRetuen = require("../utils/handleRetuen");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/userLists", (req, res) => {
  // try {
  myApi.userCtl.getAllUsers(req, res);
  // } catch (error) {
  //   res.json(
  //     handleRetuen({
  //       returnCode: httpStatus[500],
  //       error,
  //     })
  //   );
  // }
});

app.post("/api/addNewUser", (req, res) => {
  myApi.userCtl.addNewUser(req, res);
});

app.get("/api/getUserById/:id", (req, res) => {
  res.send("helloworld");
});

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
