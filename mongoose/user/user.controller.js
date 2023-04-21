const User = require("./user.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");
const jwt = require("../../utils/jwt");

function addNewUser(req, res) {
  const reqBody = req.body;
  const user = new User({
    userName: reqBody?.userName,
    passWord: reqBody?.passWord,
    email: reqBody?.email,
    mobileNumber: reqBody?.mobileNumber,
    permissions: reqBody?.permissions ?? 2,
    avatarLink: reqBody?.avatarLink,
    age: reqBody?.age,
    birthday: reqBody?.birthday,
  });
  user.save(async (error, docs) => {
    if (!error) {
      res
        .status(201)
        .cookie("access_token", await jwt.signToken(docs))
        .json(
          handleReturn({
            data: docs,
            returnCode: httpStatus[200],
          })
        );
    } else {
      res.send({
        returnCode: httpStatus[500],
        error,
      });
    }
  });
}

function getAllUsers(req, res) {
  User.find(async (error, docs) => {
    if (!error) {
      res
        .status(202)
        .cookie("access_token", await jwt.signToken(docs))
        .json(
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
