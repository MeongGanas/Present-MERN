const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const absenteeModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: [{ type: Object }],
  code: {
    type: String,
    required: true,
  },
  usersJoin: {
    type: Object,
  },
  maker: {
    type: String,
  },
});

module.exports = mongoose.model("Absentee", absenteeModel);
