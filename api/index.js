var express = require('express');
var app = express();

app.get('/test', function (req, res) {
  res.send('Hello World');
})

app.get('/test1', function (req, res) {
  res.send('Hello World1');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

module.exports = app;