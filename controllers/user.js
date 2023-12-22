const User = require("../models/user");
const Team = require("../models/Teams");
const Matchday = require("../models/matchday");

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

// Funciones para el administrador

const createTeam = async (req, res) => {
  try {
    const { name, players } = req.body;
    const newTeam = await Team.create({ name, players });

    await User.updateMany({ _id: { $in: players } }, { team: newTeam._id });

    res.json(newTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMatchDay = async (req, res) => {
  try {
    const { homeTeam, awayTeam, result } = req.body;
    const newMatchDay = await Matchday.create({ homeTeam, awayTeam, result });
    res.json(newMatchDay);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const player = await User.findById(req.user.id)
      .select("-password")
      .populate("team");

    if (!player) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId).populate("players");

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMatchDay = async (req, res) => {
  try {
    const matchdays = await Matchday.find();
    res.json(matchdays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await Team.updateOne({ _id: teamId }, req.body);
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignUserToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;

    // Validar si el usuario y el equipo existen antes de asignar
    const user = await User.findById(userId);
    const team = await Team.findById(teamId);

    if (!user || !team) {
      return res.status(404).json({ error: "User or Team not found" });
    }

    // Asignar el usuario al equipo
    user.team = teamId;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing required parameter" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, deletedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    if (!teamId) {
      return res.status(400).json({ error: "Missing required parameter" });
    }

    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({ success: true, deletedTeam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  deletePlayer,
  createTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
  createMatchDay,
  getMatchDay,
  getProfile,
  getOneTeam,
  assignUserToTeam,
};
