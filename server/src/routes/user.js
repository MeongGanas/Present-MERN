const express = require("express");
const {
  login,
  register,
  updateUser,
  getUsersData,
} = require("../controllers/UserController");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.post("/getusersdata", getUsersData);
router.post("/login", login);
router.post("/register", register);
router.patch("/update/:userId", upload.none(), updateUser);

module.exports = router;
