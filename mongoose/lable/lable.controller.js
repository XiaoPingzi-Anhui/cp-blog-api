const label = require("./label.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");

function addNewLabel(req, res) {
  const reqBody = req.body;
  const label = new label({
    labelName: reqBody?.labelName,
  });
  label.save((error, docs) => {
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

function getAllLabels(req, res) {
  label.find((error, docs) => {
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
  });
}

function getLabelById(req, res) {
  label.findById(req.params.id, (error, docs) => {
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
  });
}

function deleteLabelById(req, res) {
  label.remove({ _id: req.params.id }, (error, docs) => {
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

module.exports = { addNewLabel, getAllLabels, getLabelById, deleteLabelById };
