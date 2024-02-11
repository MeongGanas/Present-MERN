const User = require("../models/User");

const login = async (req, res) => {
  res.status(200).json("login");
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
