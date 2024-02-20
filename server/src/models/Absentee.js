const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const absenteeModel = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default: null,
  },
  code: {
    type: String,
    required: true,
  },
  usersJoin: [
    {
      type: Object,
    },
  ],
  absenteeHours: [{ type: Object }],
  attendanceLog: [{ type: Object }],
});

module.exports = mongoose.model("Absentee", absenteeModel);
