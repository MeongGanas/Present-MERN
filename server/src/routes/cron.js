const express = require("express");
const router = express.Router();

const moveData = async () => {
  try {
    const absentees = await Absentee.find({});
    await Promise.all(
      absentees.map(async (absentee) => {
        if (absentee.attendanceLog && absentee.attendanceLog.length > 0) {
          await Absentee.updateOne(
            { _id: absentee._id },
            {
              $push: {
                attendanceHistory: { $each: absentee.attendanceLog },
              },
              $set: { attendanceLog: [] },
            }
          );
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

router.get("/", moveData);

module.exports = router;
