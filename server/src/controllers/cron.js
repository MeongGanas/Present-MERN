const Absentee = require("../models/Absentee");

export default async function moveData() {
  try {
    const absentees = await Absentee.find({});
    absentees.forEach(async (absentee) => {
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
    });
  } catch (err) {
    console.log(err);
  }
}
