require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./src/routes/user");
const CronRoutes = require("./src/routes/cron");
const AbsenteeRoutes = require("./src/routes/absentee");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/absentee", AbsenteeRoutes);
app.use("/api/user", UserRoutes);

app.use("/api/cron", CronRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and port ${port}`);
    });
  })
  .catch((err) => console.log(err));
