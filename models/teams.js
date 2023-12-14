const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  players: [{ type: mongoose.ObjectId, ref: "User", unique: true }],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
