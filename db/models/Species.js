const mongoose = require("mongoose");

const Species = new mongoose.Schema(
  {
    average_height: Number,
    average_lifespan: Number,
    classification: String,
    designation: String,
    eye_colors: String,
    hair_colors: String,
    homeworld: String,
    language: String,
    name: String,
    skin_colors: String,
    url: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Species", Species);
