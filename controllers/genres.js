const Genre = require("../models/genre");

const create = async (req, res) => {
  const newGenre = await Genre.create(req.body);

  res.send(newGenre);
};

const getAll = async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
};

const getById = async (req, res) => {
  const genre = await Genre.findById(req.params.genreId);
  res.send(genre);
};

const update = async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.genreId, req.body, {
    new: true,
  });
  res.send(genre);
};

const remove = async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.genreId, req.body, {
    new: true,
  });
  res.send(genre);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
