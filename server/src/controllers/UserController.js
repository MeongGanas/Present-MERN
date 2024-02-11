const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ mssg: "User not found" });
    }

    const isPassValid = await bcrypt.compare(password, existUser.password);
    if (!isPassValid) {
      return res.status(404).json({ mssg: "Password wrong" });
    }

    res.status(200).json({ mssg: "Login success" });
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

module.exports = {
  login,
  register,
};
