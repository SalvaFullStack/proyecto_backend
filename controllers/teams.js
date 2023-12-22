const Team = require("../models/Teams");
const User = require("../models/user");

const create = async (req, res) => {
  // Crea el documento de team
  const newTeam = await Team.create(req.body);

  // Actualiza todos los documentos de usuario players de ese team
  await User.updateMany(
    { _id: { $in: req.body.players } },
    { team: newTeam._id }
  );
  res.json(newTeam);
};

const getAll = async (req, res) => {
  const teams = await Team.find().populate("players").select("name players");
  res.send(teams);
};

const getById = async (req, res) => {
  const team = await Team.findById(req.params.teamId).populate("players");
  res.send(team);
};

const update = async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, {
    new: true,
  });
  res.send(team);
};

const remove = async (req, res) => {
  // Elimina el documento
  const team = await Team.findByIdAndDelete(req.params.teamId);

  // Actualiza todos los documentos de usuario players de ese team
  await User.updateMany(
    { _id: { $in: team.players } },
    { $unset: { team: 1 } }
  );

  res.send(team);
};

const removePlayerFromTeam = async (req, res) => {
  const team = await Team.findByIdAndUpdate(
    req.params.teamId,
    {
      $pull: { players: req.params.playerId },
    },
    { new: true }
  );

  res.json(team);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  removePlayerFromTeam,
};
