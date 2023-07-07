const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String }, // featured Comp
    imgTitle: { type: String },
    imgSm: { type: String }, // no Used
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movie", movieSchema);
