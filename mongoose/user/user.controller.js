const User = require("./user.model");
const handleRetuen = require("../../utils/handleRetuen");
const httpStatus = require("http-status");

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
  user.save((error, docs) => {
    if (!error) {
      res.json(
        handleRetuen({
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
  User.find((error, docs) => {
    if (!error) {
      console.log(docs);
      res.json(
        handleRetuen({
          data: docs,
          returnCode: httpStatus[200],
        })
      );
    } else {
      res.send(
        handleRetuen({
          returnCode: httpStatus[500],
          error,
        })
      );
    }
  });
}

module.exports = { getAllUsers, addNewUser };
