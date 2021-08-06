const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const People = new mongoose.Schema(
  {
    birth_year: String,
    eye_color: String,
    films: [{ type: mongoose.Schema.Types.ObjectId, ref: "Films" }],
    gender: String,
    hair_color: String,
    height: Number,
    mass: Number,
    name: String,
    skin_color: String,
    species: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
    url: { type: String, index: { unique: true } },
  },
  { timestamps: true }
);

People.plugin(mongoosePaginate);
module.exports = mongoose.model("People", People);
