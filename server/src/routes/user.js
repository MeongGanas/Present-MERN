const express = require("express");
const {
  login,
  register,
  updateUser,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/update/:userId", updateUser);

module.exports = router;
