const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
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
        /^1[3|4|5|8][0-9]\\d{8}$/,
        "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
      ],
    },
    permissions: {
      type: number,
      required: true,
    },
    avatarLink: String,
    age: Number,
    birthday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
