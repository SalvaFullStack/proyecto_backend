const mongoose = require("mongoose");

const multimediaSchema = new mongoose.Schema({
  iDplataforma: { type: String, required: true },
  plataforma: { type: String, required: true },
});

const Multimedia = mongoose.model("Multimedia", multimediaSchema);

module.exports = Multimedia;
