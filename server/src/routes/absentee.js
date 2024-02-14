const express = require("express");
const {
  getAll,
  getSingle,
  createAbsent,
  joinAbsent,
} = require("../controllers/AbsenteeController");
const router = express.Router();

router.get("/getAll/:userId", getAll);
router.get("/getSingle/:absentId", getSingle);
router.post("/create/:userId", createAbsent);
router.post("/join", joinAbsent);

module.exports = router;
