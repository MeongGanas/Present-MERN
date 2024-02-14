const { isValidObjectId } = require("mongoose");
const Absentee = require("../models/Absentee");
const crypto = require("crypto");

const getAll = async (req, res) => {
  const { userId } = req.params;

  const absentee = await Absentee.find({
    $or: [{ userId: userId }, { usersJoin: userId }],
  });

  res.status(200).json({ absentee });
};

const getSingle = async (req, res) => {
  const { absentId } = req.params;

  const absentee = await Absentee.findById({ _id: absentId });

  if (!absentee) {
    return res.status(404).json({ mssg: "No such a absent" });
  }

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
      usersJoin: [{}],
    });

    res.status(200).json({ absentee });
  } catch (err) {
    res.status(500).json({ mssg: err });
  }
};

const updateAbsent = async () => {};

module.exports = {
  getAll,
  getSingle,
  createAbsent,
  updateAbsent,
};
