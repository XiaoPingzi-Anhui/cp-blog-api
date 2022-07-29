const Article = require("./article.model");
const handleRetuen = require("../../utils/handleRetuen");
const httpStatus = require("http-status");

function addNewArticle(req, res) {
  const reqBody = req.body;
  const article = new Article({
    userId: reqBody?.userId,
    title: reqBody?.title,
    content: reqBody?.content,
    readCount: 0,
    category: reqBody?.category,
    lables: reqBody?.lables,
  });
  article.save((error, docs) => {
    if (!error) {
      res.json(
        handleRetuen({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json({
        returnCode: httpStatus[500],
        error,
      });
    }
  });
}

function getAllArticleBaseInfo(req, res) {
  Article.find({}, "title category", (error, docs) => {
    if (!error) {
      res.json(
        handleRetuen({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json(
        handleRetuen({
          returnCode: httpStatus[500],
          error,
        })
      );
    }
  });
}

function getArticleById(req, res) {
  Article.findById(req.params.id, (error, docs) => {
    if (!error) {
      res.json(
        handleRetuen({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json(
        handleRetuen({
          returnCode: httpStatus[500],
          error,
        })
      );
    }
  });
}

function deleteArticleById(req, res) {
  Category.remove({ _id: req.params.id }, (error, docs) => {
    if (!error && docs.deletedCount === 1) {
      res.json(
        handleRetuen({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json(
        handleRetuen({
          returnCode: httpStatus[500],
          error: "can not find item",
        })
      );
    }
  });
}

module.exports = {
  addNewArticle,
  getAllArticleBaseInfo,
  getArticleById,
  deleteArticleById,
};
