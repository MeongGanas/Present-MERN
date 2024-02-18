const { isValidObjectId } = require("mongoose");
const Absentee = require("../models/Absentee");
const crypto = require("crypto");

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

  try {
    const absentee = await Absentee.create({
      name,
      ownerName: ownerName || username,
      userId,
      code,
      usersJoin: [],
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
    const absentee = await Absentee.find({ _id: id });
    const usersJoin = absentee[0].usersJoin.filter(
      (user) => user.userId !== userId
    );

    const newAbsentee = await Absentee.findByIdAndUpdate(
      { _id: id },
      { usersJoin }
    );

    res.status(200).json(newAbsentee);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  createAbsent,
  joinAbsent,
  leaveAbsent,
};
