const express = require("express");
const {
  getAll,
  createAbsent,
  joinAbsent,
  leaveAbsent,
  createAbsentHour,
  editAsPaticipant,
  editAsOwner,
  getAbsentName,
} = require("../controllers/AbsenteeController");
const router = express.Router();

router.get("/getAll/:userId", getAll);
router.get("/getAbsentName/:absentId", getAbsentName);

router.post("/create/:userId", createAbsent);
router.post("/join", joinAbsent);

router.patch("/leave/:id/:userId", leaveAbsent);
router.patch("/createAbsentHour/:absentId", createAbsentHour);
router.patch("/edit/participant/:absentId/:userId", editAsPaticipant);
router.patch("/edit/owner/:absentId/", editAsOwner);

module.exports = router;
