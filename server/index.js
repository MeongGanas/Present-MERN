require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
const cors = require("cors");

const UserRoutes = require("./src/routes/user");
const CronRoutes = require("./src/routes/cron");
const AbsenteeRoutes = require("./src/routes/absentee");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("./src/models/User");
const bcrypt = require("bcrypt");

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/absentee", AbsenteeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/cron", CronRoutes);

app.post("/forgotpass", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ mssg: "User not existed" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "presentresetpass@gmail.com",
        pass: "jiijixiknclslzts",
      },
    });

    let mailOptions = {
      from: "presentresetpass@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttps://present-client-green.vercel.app/reset/${user._id}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

app.post("/reset/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 12)
        .then((hash) => {
          User.findByIdAndUpdate(id, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and port ${port}`);
    });
  })
  .catch((err) => console.log(err));
