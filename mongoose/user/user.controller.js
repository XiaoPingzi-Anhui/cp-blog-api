const User = require("./user.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");
const jwt = require("../../utils/jwt");

function addNewUser(req, res) {
  const { userName, email, authority, passwordHash, phoneNumber } = req.body;
  const user = new User({
    userName,
    passwordHash,
    email,
    phoneNumber,
    authority,
  });
  user.save(async (error, docs) => {
    if (!error) {
      res
        .status(200)
        .cookie("access_token", await jwt.signToken(docs))
        .json(
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

function getAllUsers(req, res) {
  User.find(async (error, docs) => {
    if (!error) {
      res.status(200).json(
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

function getUserById(req, res) {
  User.findById(req.params.id, (error, docs) => {
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

function deleteUserById(req, res) {
  User.remove({ _id: req.params.id }, (error, docs) => {
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

module.exports = { getAllUsers, addNewUser, getUserById, deleteUserById };
