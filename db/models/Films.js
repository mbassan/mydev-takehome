const mongoose = require("mongoose");

const Films = new mongoose.Schema(
  {
    director: String,
    episode_id: Number,
    opening_crawl: String,
    producer: String,
    release_date: String,
    species: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
    title: String,
    url: { type: String, index: { unique: true } },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Films", Films, "films");
