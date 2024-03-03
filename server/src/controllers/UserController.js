require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinaryImageUploadMethod } = require("../api/cloudinary");

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

    if (password === "") {
      return res.status(404).json({ mssg: "Password harus diisi" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashPassword });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, photo, newPass, prevPass } = req.body;

  try {
    let uploadPhoto;
    if (photo !== "") {
      uploadPhoto = await cloudinaryImageUploadMethod(photo);
    }

    const existUser = await User.find({ email });
    if (existUser.length > 0 && existUser[0]._id != userId) {
      return res.status(404).json({ mssg: "Email telah digunakan" });
    }

    if (newPass !== "" && prevPass !== "") {
      const existUser = await User.findById(userId);
      const isPassValid = await bcrypt.compare(prevPass, existUser.password);
      if (isPassValid) {
        const hashPassword = await bcrypt.hash(newPass, 12);
        const updateUserData = await User.findByIdAndUpdate(
          userId,
          {
            username,
            email,
            profile: uploadPhoto ? uploadPhoto.secure_url : existUser.profile,
            password: hashPassword,
          },
          { new: true }
        );

        res.status(200).json(updateUserData);
      } else {
        res.status(401).json({ mssg: "Prev password wrong" });
      }
    } else {
      const updateUserData = await User.findByIdAndUpdate(
        userId,
        {
          username,
          email,
          profile: uploadPhoto ? uploadPhoto.secure_url : existUser.profile,
        },
        { new: true }
      );

      res.status(200).json(updateUserData);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUsersData = async (req, res) => {
  const { users } = req.body;
  console.log(users);

  try {
    const usersDataPromises = users.map((user) => User.findById(user));
    const usersData = await Promise.all(usersDataPromises);
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  login,
  register,
  updateUser,
  getUsersData,
};
