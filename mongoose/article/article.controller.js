const Article = require("./article.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");
const jwt = require("../../utils/jwt");

async function addNewArticle(req, res) {
  const tokenPayload = await jwt.verifyToken(
    req.headers?.authorization ?? "cp"
  );
  if (
    !["站长", "普通用户", "管理员"].includes(tokenPayload?.userInfo?.authority)
  ) {
    return res.json(
      handleReturn({
        returnCode: httpStatus[401],
        error: 'message: "Unauthorized",',
      })
    );
  }
  const reqBody = req.body;
  const article = new Article({  
    authorId: reqBody?.authorId,
    authorName: reqBody?.authorName,
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

async function getAllArticleBaseInfo(req, res) {
  // const tokenPayload = await jwt.verifyToken(
  //   req.headers?.authorization ?? "cp"
  // );
  // if (!tokenPayload?.userInfo?.authority) {
  //   return res.json(
  //     handleReturn({
  //       returnCode: httpStatus[401],
  //       error: 'message: "Unauthorized",',
  //     })
  //   );
  // }
  Article.find(
    {},
    "title category labels createdAt readCount authorId authorName likeStar",
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

async function getArticleById(req, res) {
  // const tokenPayload = await jwt.verifyToken(
  //   req.headers?.authorization ?? "cp"
  // );
  // if (!tokenPayload?.userInfo?.authority) {
  //   return res.json(
  //     handleReturn({
  //       returnCode: httpStatus[401],
  //       error: 'message: "Unauthorized",',
  //     })
  //   );
  // }
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

// todo:鉴权
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

// todo:鉴权
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
