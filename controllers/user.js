const { Matchday } = require("../models/matchday");
const User = require("../models/user");

// Funciones para el usuario normal
const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNextMatchday = async (req, res) => {
  try {
    // Aquí puedes realizar la lógica para obtener la próxima jornada.
    // Supongamos que tienes un campo en el modelo Matchday que indica si la jornada es futura.

    const nextMatchday = await Matchday.findOne({ future: true }).populate(
      "matches.homeTeam matches.awayTeam"
    );

    if (!nextMatchday) {
      return res.status(404).json({ error: "No upcoming matchdays found" });
    }

    res.json({ matchday: nextMatchday });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funciones para el administrador
const viewAllPlayers = async (req, res) => {
  try {
    const allPlayers = await User.find();
    res.json(allPlayers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterPlayersByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const playersByPosition = await User.find({ position });
    res.json(playersByPosition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const assignUsersToTeam = async (req, res) => {
  try {
    const { userIds, teamId } = req.body;

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    if (!userIds || !teamId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const updatedUsers = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { teamId: teamId } }
    );

    res.json({ success: true, updatedUsers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getNextMatchday,
  viewAllPlayers,
  filterPlayersByPosition,
  assignUsersToTeam,
  // Agrega aquí las demás funciones del administrador...
};
