const express = require("express");
const bodyParser = require("body-parser");
// const httpStatus = require("http-status");
const myApi = require("../mongoose/index");
const handleRetuen = require("../utils/handleRetuen");

const app = express();
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
app.get("/api/lableLists", (req, res) => {
  myApi.lableCtl.getAllLables(req, res);
});

/* 新增标签 */
app.post("/api/addNewLable", (req, res) => {
  myApi.lableCtl.addNewLable(req, res);
});

/* 通过id查询标签 */
app.get("/api/getLableById/:id", (req, res) => {
  myApi.lableCtl.getLableById(req, res);
});

/* 通过id删除标签 */
app.delete("/api/deleteLableById/:id", (req, res) => {
  myApi.lableCtl.deleteLableById(req, res);
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

const server = app.listen(8082, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

module.exports = app;
