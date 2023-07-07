const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    type: { type: String }, // movie or series
    genre: { type: String }, // ((4 types))
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
