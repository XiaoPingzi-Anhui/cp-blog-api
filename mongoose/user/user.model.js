const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/,
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
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^1\d{10}$/,
        "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
      ],
    },
    sex: { type: String },
    likeArticlesId: {
      type: String,
      default: "",
    },
    personalSignature: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
    },
    age: {
      type: Number,
    },
    birthday: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
