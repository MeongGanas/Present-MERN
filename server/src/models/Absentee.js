const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceLogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    shiftId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: String,
      default: "-",
    },
    checkOutTime: {
      type: String,
      default: "-",
    },
    notes: {
      type: String,
      default: "-",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const shiftSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  entry: {
    type: String,
    required: true,
  },
  leave: {
    type: String,
    required: true,
  },
  tolerance: {
    type: String,
    required: true,
  },
  selectedDay: {
    type: Array,
    required: true,
  },
});

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
  absenteeHours: [shiftSchema],
  attendanceLog: [attendanceLogSchema],
  attendanceHistory: [attendanceLogSchema],
  color: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Absentee", absenteeModel);
