const express = require("express");
const Absentee = require("../models/Absentee");
const router = express.Router();

const moveData = async () => {
  try {
    const allAbsentees = await Absentee.find({});
    const bulkOperations = allAbsentees.map((absentee) => {
      const update = {
        updateOne: {
          filter: { _id: absentee._id },
          update: {
            $push: { attendanceHistory: { $each: absentee.attendanceLog } },
            $set: { attendanceLog: [] },
          },
        },
      };
      return update;
    });

    if (bulkOperations.length > 0) {
      await Absentee.bulkWrite(bulkOperations);
    }
  } catch (err) {
    console.log(err);
  }
};

router.get("/", moveData);

module.exports = router;
