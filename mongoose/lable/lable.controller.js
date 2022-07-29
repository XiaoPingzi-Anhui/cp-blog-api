const Lable = require("./lable.model");
const handleRetuen = require("../../utils/handleRetuen");
const httpStatus = require("http-status");

function addNewLable(req, res) {
  const reqBody = req.body;
  const lable = new Lable({
    lableName: reqBody?.lableName,
  });
  lable.save((error, docs) => {
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

function getAllLables(req, res) {
  Lable.find((error, docs) => {
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

function getLableById(req, res) {
  Lable.findById(req.params.id, (error, docs) => {
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

function deleteLableById(req, res) {
  Lable.remove({ _id: req.params.id }, (error, docs) => {
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

module.exports = { addNewLable, getAllLables, getLableById, deleteLableById };
