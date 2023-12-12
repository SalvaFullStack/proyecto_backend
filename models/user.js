const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  position: {
    type: String,
    enum: ["Delantero", "Centrocampista", "Defensa", "Portero"],
    required: true,
  },
  isAdmin: { type: Boolean },
});

userSchema.statics.getAll = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);

exports.User = User;
