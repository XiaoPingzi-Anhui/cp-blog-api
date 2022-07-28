const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "The value of path {PATH} ({VALUE}) is not a valid email address.",
      ],
    },
    mobileNumber: {
      type: String,
      required: true,
      match: [
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
      ],
    },
    permissions: {
      type: Number,
      required: true,
    },
    avatarLink: String,
    age: Number,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
