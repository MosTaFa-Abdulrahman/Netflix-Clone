const express = require("express");
const router = express.Router();
const List = require("../models/List");

// Create
router.post("/create", async (req, res, next) => {
  try {
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (error) {
    res.status(400).json("Error Create List !!~!!");
  }
});

// Delete
router.delete("/delete/:id", async (req, res, next) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted List Successful ☻♥");
  } catch (error) {
    res.status(400).json("Error Deleted List !!~!!");
  }
});

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const updateList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateList);
  } catch (error) {
    res.status(400).json("Error Updated List !!~!!");
  }
});

// Get
router.get("/get", async (req, res, next) => {
  const typeQuery = req.query.type; // movie or series
  const genreQuery = req.query.genre; // types of genre ((4 types))
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else list = await List.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json("Error Get ALL Lists !!~!!");
  }
});

module.exports = router;
