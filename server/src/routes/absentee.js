const express = require("express");
const {
  getAll,
  createAbsent,
  joinAbsent,
  leaveAbsent,
} = require("../controllers/AbsenteeController");
const router = express.Router();

router.get("/getAll/:userId", getAll);
router.post("/create/:userId", createAbsent);
router.post("/join", joinAbsent);
router.patch("/leave/:id/:userId", leaveAbsent);

module.exports = router;
