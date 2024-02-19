require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ mssg: "User not found" });
    }

    const isPassValid = await bcrypt.compare(
      password.toString(),
      existUser.password
    );
    if (!isPassValid) {
      return res.status(404).json({ mssg: "Password wrong" });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ token, user: existUser, mssg: "Login Berhasil" });
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(404).json({ mssg: "Email telah digunakan" });
    }
    const user = await User.create({ username, email, password });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const existUser = await User.find({ email: req.body.email });
    if (existUser.length > 0 && existUser[0]._id != userId) {
      return res.status(404).json({ mssg: "Email telah digunakan" });
    }

    const updateUserData = await User.findByIdAndUpdate(
      { _id: userId },
      { ...req.body }
    );

    const newUser = await User.find({ _id: userId });

    res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  login,
  register,
  updateUser,
};
