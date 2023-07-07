const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const { verifyAdmin } = require("../utils/verifyToken");

// Create
router.post("/create", verifyAdmin, async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (error) {
    res.status(500).json("Error Create Movie !!~");
  }
});

// Update
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json("Error Updated Movie !!~");
  }
});

// Delete ((verifyAdmin))
router.delete("/delete/:id", verifyAdmin, async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie Deleted Successful ☻♥");
  } catch (error) {
    res.status(500).json("Error Deleted Movie !!~");
  }
});

// Get
router.get("/get/:id", async (req, res, next) => {
  try {
    const getMovie = await Movie.findById(req.params.id);
    res.status(200).json(getMovie);
  } catch (error) {
    res.status(500).json("Error Get Movie !!~");
  }
});

// Get ALL ((verifyAdmin))
router.get("/get", verifyAdmin, async (req, res, next) => {
  try {
    const getAllMovies = await Movie.find();
    res.status(200).json(getAllMovies.reverse()); // get modern to last ☻
  } catch (error) {
    res.status(500).json("Error Get ALL Movies !!~");
  }
});

// Get Random Movies
router.get("/random", async (req, res, next) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json("Error Get Random Movies !!~~~!!");
  }
});

module.exports = router;
