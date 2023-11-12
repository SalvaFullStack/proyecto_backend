const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  favorites: [{ type: mongoose.ObjectId, ref: "Band" }],
  isAdmin: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
