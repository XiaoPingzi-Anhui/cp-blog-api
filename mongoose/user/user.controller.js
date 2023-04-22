const User = require("./user.model");
const handleReturn = require("../../utils/handleReturn");
const httpStatus = require("http-status");
const jwt = require("../../utils/jwt");
const bcrypt = require("bcryptjs");

function addNewUser(req, res) {
  const {
    username,
    email,
    authority,
    password,
    phoneNumber,
    avatarUrl,
    personalSignature,
    sex,
  } = req.body;
  const user = new User({
    username,
    passwordHash: password,
    email,
    phoneNumber,
    authority,
    avatarUrl,
    personalSignature,
    sex,
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

function login(req, res) {
  User.find({ email: req.body?.email }, async (error, docs) => {
    if (!error) {
      const user = docs[0];
      if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
        return res.status(401).json({
          message: "Invalid email or password!",
        });
      } else {
        res
          .status(200)
          .setHeader(
            "Set-Cookie",
            `access_token=${await jwt.signToken(user)};Path=/`
          )
          .json(
            handleReturn({
              data: user,
              returnCode: httpStatus[200],
            })
          );
      }
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

module.exports = {
  getAllUsers,
  addNewUser,
  getUserById,
  deleteUserById,
  login,
};
