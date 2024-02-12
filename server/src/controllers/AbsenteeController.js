const { isValidObjectId } = require("mongoose");
const Absentee = require("../models/Absentee");
const crypto = require("crypto");

const getAll = async () => {};

const getSingle = async () => {};

const createAbsent = async (req, res) => {
  const data = req.body;
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "ID not valid" });
  }

  const code = crypto.randomBytes(6).toString("hex").slice(0, 6).toUpperCase();

  const absentee = await Absentee.create({
    ...data,
    userId,
    code,
    usersJoin: [],
  });

  res.status(200).json({ absentee });
};

const updateAbsent = async () => {};

module.exports = {
  getAll,
  getSingle,
  createAbsent,
  updateAbsent,
};
