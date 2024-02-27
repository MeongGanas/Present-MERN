require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cron = require("node-cron");

const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./src/routes/user");
const AbsenteeRoutes = require("./src/routes/absentee");
const Absentee = require("./src/models/Absentee");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const moveData = async () => {
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
};

app.use("/api/absentee", AbsenteeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/cron", moveData);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and port ${port}`);
    });
  })
  .catch((err) => console.log(err));
