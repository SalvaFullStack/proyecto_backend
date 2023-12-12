const Team = require("../models/Teams");

const create = async (req, res) => {
  const newTeam = await Team.create(req.body);

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
  const team = await Team.findByIdAndDelete(req.params.teamId);
  res.send(team);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
