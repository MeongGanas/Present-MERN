const { isValidObjectId } = require("mongoose");
const Absentee = require("../models/Absentee");
const crypto = require("crypto");
const randomColor = require("randomcolor");

const getAll = async (req, res) => {
  const { userId } = req.params;

  const absentee = await Absentee.find({
    $or: [{ userId }, { usersJoin: { $elemMatch: { userId } } }],
  });

  res.status(200).json({ absentee });
};

const createAbsent = async (req, res) => {
  const { name, ownerName, username } = req.body;
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "ID not valid" });
  }

  const code = crypto.randomBytes(6).toString("hex").slice(0, 6).toUpperCase();

  const options = {
    hue: "monochrome",
    luminosity: "dark",
  };
  const color = randomColor(options);

  try {
    const absentee = await Absentee.create({
      name,
      ownerName: ownerName || username,
      userId,
      code,
      usersJoin: [],
      absenteeHours: [],
      attendanceLog: [],
      color,
    });

    res.status(200).json({ absentee });
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const joinAbsent = async (req, res) => {
  const { code, displayName, username, userId } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "ID not valid" });
  }

  try {
    const existUser = await Absentee.find({
      code,
      $or: [{ userId }, { usersJoin: { $elemMatch: { userId } } }],
    });

    if (existUser.length > 0) {
      return res.status(404).json({ mssg: "You already in this absent" });
    }

    const absentee = await Absentee.findOneAndUpdate(
      { code },
      {
        $addToSet: { usersJoin: { userId, username: displayName || username } },
      }
    );

    res.status(200).json({ absentee });
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const leaveAbsent = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const absentee = await Absentee.findById(id);
    const usersJoin = absentee[0].usersJoin.filter(
      (user) => user.userId !== userId
    );

    const newAbsentee = await Absentee.findByIdAndUpdate(id, { usersJoin });

    res.status(200).json(newAbsentee);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const editAsPaticipant = async (req, res) => {
  const { absentId, userId } = req.params;

  try {
    const absentee = await Absentee.findById(absentId);
    const updatedUsersJoin = absentee[0].usersJoin.map((user) => {
      if (user.userId === userId) {
        return { ...user, username: req.body.newUsername };
      }
      return user;
    });

    const updateAbsentee = await Absentee.findByIdAndUpdate(absentId, {
      usersJoin: updatedUsersJoin,
    });
    res.status(200).json(updateAbsentee);
  } catch (err) {
    res.status(500).json(err);
  }
};

const editAsOwner = async (req, res) => {
  const { absentId } = req.params;
  const { newAbsentName, newOwnerName } = req.body;

  try {
    const updateAbsentee = await Absentee.findByIdAndUpdate(absentId, {
      ownerName: newOwnerName,
      name: newAbsentName,
    });

    res.status(200).json(updateAbsentee);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAbsentHour = async (req, res) => {
  const { absentId } = req.params;

  try {
    const absentHour = await Absentee.findByIdAndUpdate(absentId, {
      $addToSet: {
        absenteeHours: { ...req.body },
      },
    });
    res.status(200).json(absentHour);
  } catch (err) {
    res.status(500).json(err);
  }
};

const attendance = async (req, res) => {
  const { absentId } = req.params;

  try {
    const attendancLog = await Absentee.findByIdAndUpdate(absentId, {
      $addToSet: {
        attendanceLog: { ...req.body },
      },
    });
    res.status(200).json(attendancLog);
  } catch (err) {
    res.status(500).json(err);
  }
};

const disband = async (req, res) => {
  const { absentId } = req.params;

  try {
    const absentee = await Absentee.findByIdAndDelete({ _id: absentId });
    res.status(200).json(absentee);
  } catch (err) {
    res.status(500).json(err);
  }
};

const checkOut = async (req, res) => {
  const { absentId, shiftId, userId } = req.params;

  try {
    const absentee = await Absentee.findById(absentId);
    const newAttendance = absentee.attendanceLog.map((log) => {
      if (log.shiftId === shiftId && log.userId === userId) {
        log.checkOutTime = req.body.time;
        return log;
      }
      return log;
    });
    const updateAbsent = await Absentee.findByIdAndUpdate(
      absentId,
      { attendanceLog: newAttendance },
      { new: true }
    );
    res.status(200).json(updateAbsent);
  } catch (err) {
    res.status(500).json(err);
  }
};

const permission = async (req, res) => {
  const { absentId } = req.params;

  try {
    const absentee = await Absentee.findByIdAndUpdate(absentId, {
      $addToSet: {
        attendanceLog: { ...req.body },
      },
    });
    res.status(200).json(absentee);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  createAbsent,
  joinAbsent,
  leaveAbsent,
  disband,
  editAsOwner,
  editAsPaticipant,
  createAbsentHour,
  attendance,
  checkOut,
  permission,
};
