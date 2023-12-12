const Matchday = require("../models/matchday");

const create = async (req, res) => {
  const newMatchDay = await Matchday.create(req.body);

  res.send(newMatchDay);
};

const getAll = async (req, res) => {
  const matchdays = await Matchday.find().populate(
    "matches.homeTeam matches.awayTeam"
  );
  res.send(matchdays);
};

const getById = async (req, res) => {
  const matchday = await Matchday.findById(req.params.matchdayId).populate(
    "matches.homeTeam matches.awayTeam"
  );
  res.send(matchday);
};

const update = async (req, res) => {
  const matchday = await Matchday.findByIdAndUpdate(
    req.params.matchdayId,
    req.body,
    {
      new: true,
    }
  );
  res.send(matchday);
};

const remove = async (req, res) => {
  const matchday = await Matchday.findByIdAndDelete(req.params.matchdayId);
  res.send(matchday);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
