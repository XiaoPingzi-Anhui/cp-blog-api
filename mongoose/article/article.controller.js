const Article = require("./article.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");

function addNewArticle(req, res) {
  const reqBody = req.body;
  const article = new Article({
    userId: reqBody?.userId,
    title: reqBody?.title,
    content: reqBody?.content,
    readCount: 0,
    category: reqBody?.category,
    labels: reqBody?.labels,
  });
  article.save((error, docs) => {
    if (!error) {
      res.json(
        handleReturn({
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
  Article.find(
    {},
    "title category labels createdAt readCount",
    (error, docs) => {
      if (!error) {
        res.json(
          handleReturn({
            data: docs,
            returnCode: httpStatus[200],
          })
        );
      } else {
        res.json(
          handleReturn({
            returnCode: httpStatus[500],
            error,
          })
        );
      }
    }
  );
}

function getArticleById(req, res) {
  Article.findById(req.params.id, (error, docs) => {
    if (!error) {
      const article = {
        readCount: docs?.readCount + 1,
      };
      Article.updateOne(
        { _id: req.params.id },
        { $set: article },
        (e, doc) => {}
      );
      res.json(
        handleReturn({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json(
        handleReturn({
          returnCode: httpStatus[500],
          error,
        })
      );
    }
  });
}

function deleteArticleById(req, res) {
  Article.remove({ _id: req.params.id }, (error, docs) => {
    if (!error && docs.deletedCount === 1) {
      res.json(
        handleReturn({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.json(
        handleReturn({
          returnCode: httpStatus[500],
          error: "can not find item",
        })
      );
    }
  });
}

function updateArticleById(req, res) {
  const reqBody = req.body;
  const article = {
    userId: reqBody?.userId,
    title: reqBody?.title,
    content: reqBody?.content,
    readCount: reqBody?.readCount ?? 0 + 1,
    category: reqBody?.category,
    labels: reqBody?.labels,
  };
  Article.updateOne(
    { _id: req.params.id },
    { $set: article },
    (error, docs) => {
      if (!error) {
        res.json(
          handleReturn({
            data: docs,
            returnCode: httpStatus[200],
          })
        );
      } else {
        res.json(
          handleReturn({
            returnCode: httpStatus[500],
            error: "can not find item",
          })
        );
      }
    }
  );
}

module.exports = {
  addNewArticle,
  getAllArticleBaseInfo,
  getArticleById,
  deleteArticleById,
  updateArticleById,
};
