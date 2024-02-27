const express = require("express");
const Absentee = require("../models/Absentee");
const router = express.Router();

const moveData = async () => {
  try {
    const absentees = await Absentee.find({});
    const bulkOperations = absentees.map((absentee) => ({
      updateOne: {
        filter: { _id: absentee._id },
        update: {
          $push: {
            attendanceHistory: { $each: absentee.attendanceLog },
          },
          $set: { attendanceLog: [] },
        },
      },
    }));

    await Absentee.bulkWrite(bulkOperations, { ordered: false });
  } catch (err) {
    console.log(err);
  }
};

router.get("/", moveData);

module.exports = router;
