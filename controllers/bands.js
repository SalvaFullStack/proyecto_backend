const Band = require("../models/bands");

const create = async (req, res) => {
  const newBand = await Band.create(req.body);

  res.json(newBand);
};

const getAll = async (req, res) => {
  const bands = await Band.find().populate("genres").select("name date genres");
  res.send(bands);
};

const getById = async (req, res) => {
  const band = await Band.findById(req.params.bandId).populate(
    "genres multimedia"
  );
  res.send(band);
};

const update = async (req, res) => {
  const band = await Band.findByIdAndUpdate(req.params.bandId, req.body, {
    new: true,
  });
  res.send(band);
};

const remove = async (req, res) => {
  const band = await Band.findByIdAndDelete(req.params.bandId, req.body, {
    new: true,
  });
  res.send(band);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
