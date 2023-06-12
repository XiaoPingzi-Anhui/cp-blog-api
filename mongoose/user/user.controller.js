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
            cookie: await jwt.signToken(user),
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
          .setHeader("Set-Cookie", `access_token=${await jwt.signToken(user)}`)
          .json(
            handleReturn({
              data: user,
              returnCode: httpStatus[200],
              cookie: await jwt.signToken(user),
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

async function getAllUsers(req, res) {
  const tokenPayload = await jwt.verifyToken(
    req.headers?.authorization ?? "cp"
  );
  if (tokenPayload?.userInfo?.authority !== "站长") {
    return res.json(
      handleReturn({
        returnCode: httpStatus[401],
        error: 'message: "Unauthorized",',
      })
    );
  }

  User.find((error, docs) => {
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

async function getUserById(req, res) {
  const tokenPayload = await jwt.verifyToken(
    req.headers?.authorization ?? "cp"
  );
  if (tokenPayload?.userInfo?.authority !== "站长") {
    return res.json(
      handleReturn({
        returnCode: httpStatus[401],
        error: 'message: "Unauthorized",',
      })
    );
  }
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

async function deleteUserById(req, res) {
  const tokenPayload = await jwt.verifyToken(
    req.headers?.authorization ?? "cp"
  );
  if (tokenPayload?.userInfo?.authority !== "站长") {
    return res.json(
      handleReturn({
        returnCode: httpStatus[401],
        error: 'message: "Unauthorized",',
      })
    );
  }
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

async function updateUserById(req, res) {
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
  const user = {
    email: reqBody?.email,
    authority: reqBody?.authority,
    passwordHash: reqBody?.passwordHash,
    username: reqBody?.username,
    phoneNumber: reqBody?.phoneNumber,
    sex: reqBody?.sex,
    likeArticlesId: reqBody?.likeArticlesId,
    personalSignature: reqBody?.personalSignature,
    avatarUrl: reqBody?.avatarUrl,
    age: reqBody?.age,
    birthday: reqBody?.birthday,
  };
  User.updateOne(
    { _id: reqBody.userId },
    { $set: user },
    (error, docs) => {
      if (!error) {
        User.findById(req.params.id, async (errorInner, user) => {
          if (!errorInner) {
            res.setHeader("Set-Cookie", `access_token=${await jwt.signToken(user)}`)
            .json(
              handleReturn({
                data: user,
                returnCode: httpStatus[200],
                cookie: await jwt.signToken(user),
              })
            );
          } 
        })
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
  getAllUsers,
  addNewUser,
  getUserById,
  deleteUserById,
  login,
  updateUserById
};
