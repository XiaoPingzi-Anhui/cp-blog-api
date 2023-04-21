const jwt = require("jsonwebtoken");

const TOKEN_VALIDITY_PERIOD = 60 * 60 * 24 * 30;

const secret = "chenping"; // process.env.JWT_SECRET;

function signToken(userInfo) {
  if (!secret)
    throw new Error("Environment variable JWT_SECRET is not defined!");
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userInfo },
      secret,
      { expiresIn: TOKEN_VALIDITY_PERIOD },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  if (!secret)
    throw new Error("Environment variable JWT_SECRET is not defined!");
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err || !payload || !payload) return reject(err);
      resolve(payload);
    });
  });
}

module.exports = { signToken, verifyToken };
