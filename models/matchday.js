const mongoose = require("mongoose");

const matchdaySchema = new mongoose.Schema({
  matches: [
    {
      homeTeam: { type: mongoose.ObjectId, ref: "Team", required: true },
      awayTeam: { type: mongoose.ObjectId, ref: "Team", required: true },
      result: { type: String },
    },
  ],
});

const Matchday = mongoose.model("Matchday", matchdaySchema);

module.exports = Matchday;
