const Koa = require('koa');
const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello Vercel';
// });
var express = require('express');
var expressapp = express();

expressapp.get('/', function (req, res) {
  res.send('Hello World');
})

expressapp.get('/test', function (req, res) {
  res.send('Hello Worldtest!');
})

expressapp.listen(3008, () => {
  console.log('3008项目启动')
});

module.exports = expressapp