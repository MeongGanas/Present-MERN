const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Users", userModel);
