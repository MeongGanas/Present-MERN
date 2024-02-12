const express = require("express");
const {
  getAll,
  getSingle,
  createAbsent,
} = require("../controllers/AbsenteeController");
const router = express.Router();

router.get("/getAll", getAll);
router.get("/getSinggle", getSingle);
router.post("/create/:userId", createAbsent);

module.exports = router;
