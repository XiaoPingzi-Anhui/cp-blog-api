const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "The value of path {PATH} ({VALUE}) is not a valid email address.",
      ],
    },
    authority: {
      type: String,
      required: true,
      default: "游客",
    },
    passwordHash: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
      ],
    },
    sex: String,
    likeArticlesId: {
      type: String,
      default: "",
    },
    personalSignature: {
      type: String,
      default: "",
    },
    avatarLink: String,
    age: Number,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
