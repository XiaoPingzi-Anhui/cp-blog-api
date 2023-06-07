const express = require("express");
const bodyParser = require("body-parser");
const myApi = require("../mongoose/index");

const app = express();
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type,Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* -------------------------------------------- 用户 ------------------------------------ */
/* 获取所有用户列表 */
app.get("/api/userLists", (req, res) => {
  myApi.userCtl.getAllUsers(req, res);
});

/* 新增用户 */
app.post("/api/addNewUser", (req, res) => {
  myApi.userCtl.addNewUser(req, res);
});

/* 通过id查询用户 */
app.get("/api/getUserById/:id", (req, res) => {
  myApi.userCtl.getUserById(req, res);
});

/* 通过id删除用户 */
app.delete("/api/deleteUserById/:id", (req, res) => {
  myApi.userCtl.deleteUserById(req, res);
});

/* 登录 */
app.post("/api/login", (req, res) => {
  myApi.userCtl.login(req, res);
});

/* -------------------------------------------- 分类 ------------------------------------ */
/* 获取所有分类列表 */
app.get("/api/categoryLists", (req, res) => {
  myApi.categoryCtl.getAllCategory(req, res);
});

/* 新增分类 */
app.post("/api/addNewCategory", (req, res) => {
  myApi.categoryCtl.addNewCategory(req, res);
});

/* 通过id查询分类 */
app.get("/api/getCategoryById/:id", (req, res) => {
  myApi.categoryCtl.getCategoryById(req, res);
});

/* 通过id删除分类 */
app.delete("/api/deleteCategoryById/:id", (req, res) => {
  myApi.categoryCtl.deleteCategoryById(req, res);
});

/* -------------------------------------------- 标签 ------------------------------------ */
/* 获取所有标签列表 */
app.get("/api/labelLists", (req, res) => {
  myApi.labelCtl.getAllLabels(req, res);
});

/* 新增标签 */
app.post("/api/addNewLabel", (req, res) => {
  myApi.labelCtl.addNewLabel(req, res);
});

/* 通过id查询标签 */
app.get("/api/getLabelById/:id", (req, res) => {
  myApi.labelCtl.getLabelById(req, res);
});

/* 通过id删除标签 */
app.delete("/api/deleteLabelById/:id", (req, res) => {
  myApi.labelCtl.deleteLabelById(req, res);
});

/* -------------------------------------------- 文章 ------------------------------------ */
/* 获取所有文章列表 */
app.get("/api/articleLists", (req, res) => {
  myApi.articleCtl.getAllArticleBaseInfo(req, res);
});

/* 新增文章 */
app.post("/api/addNewArticle", (req, res) => {
  myApi.articleCtl.addNewArticle(req, res);
});

/* 通过id查询文章 */
app.get("/api/getArticleById/:id", (req, res) => {
  myApi.articleCtl.getArticleById(req, res);
});

/* 通过id删除文章 */
app.delete("/api/deleteArticleById/:id", (req, res) => {
  myApi.articleCtl.deleteArticleById(req, res);
});

/* 通过id更新文章 */
app.post("/api/updateArticleById/:id", (req, res) => {
  myApi.articleCtl.updateArticleById(req, res);
});

const server = app.listen(8082, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
