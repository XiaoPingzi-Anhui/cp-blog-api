const Category = require("./category.model");
const handleRetuen = require("../../utils/handleRetuen");
const httpStatus = require("http-status");

function addNewCategory(req, res) {
  const reqBody = req.body;
  const category = new Category({
    categoryName: reqBody?.categoryName,
  });
  category.save((error, docs) => {
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

function getAllCategory(req, res) {
  Category.find((error, docs) => {
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

function getCategoryById(req, res) {
  Category.findById(req.params.id, (error, docs) => {
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

function deleteCategoryById(req, res) {
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
  addNewCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
};
