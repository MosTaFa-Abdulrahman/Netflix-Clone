const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

// Check
router.get("/checkUser", verifyUser, (req, res) => {
  res.status(200).json("Hello, iam User ☻");
});
router.get("/checkAdmin", verifyAdmin, (req, res) => {
  res.status(200).json("Hello, iam Admin ☻♥");
});

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json("Error Update User !!~");
  }
});

// Delete ((verifyUser))
router.delete("/delete/:id", verifyUser, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted ☻♥");
  } catch (error) {
    res.status(400).json("Error Deleted User !!~");
  }
});

// Get ((verifyUser))
router.get("/get/:id", verifyUser, async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json("Error Get User !!~");
  }
});

// Get ALL ((verifyAdmin))
router.get("/get", verifyAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("I Can not Get ALL Users !!~");
  }
});

module.exports = router;
