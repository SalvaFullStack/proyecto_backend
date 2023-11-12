const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  date: { type: Date, required: true },
  about: { type: String, required: true },
  genres: { type: mongoose.ObjectId, ref: "Genre" },
  multimedia: [{ type: mongoose.ObjectId, ref: "Multimedia" }],
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
