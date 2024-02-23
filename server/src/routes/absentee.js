const express = require("express");
const {
  getAll,
  createAbsent,
  joinAbsent,
  leaveAbsent,
  createAbsentHour,
  editAsPaticipant,
  editAsOwner,
  attendance,
  disband,
} = require("../controllers/AbsenteeController");
const router = express.Router();

router.get("/getAll/:userId", getAll);

router.post("/create/:userId", createAbsent);
router.post("/join", joinAbsent);

router.patch("/leave/:id/:userId", leaveAbsent);
router.patch("/createAbsentHour/:absentId", createAbsentHour);
router.patch("/attendance/:absentId/", attendance);
router.patch("/edit/participant/:absentId/:userId", editAsPaticipant);
router.patch("/edit/owner/:absentId/", editAsOwner);

router.delete("/disband/:absentId/", disband);

module.exports = router;
