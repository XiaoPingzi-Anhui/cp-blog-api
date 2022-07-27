const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    // match: [
    //   /^[1-9][0-9]{9}$/,
    //   "The value of path {PATH} ({VALUE}) is not a valid mobile number.",
    // ],
  },
  age: Number,
});

module.exports = mongoose.model("User", UserSchema);
