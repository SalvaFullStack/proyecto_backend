const Multimedia = require("../models/multimedia");

const create = async (req, res) => {
  const newMultimedia = await Multimedia.create(req.body);

  res.send(newMultimedia);
};

const getAll = async (req, res) => {
  const multimedia = await Multimedia.find();
  res.send(multimedia);
};

const getById = async (req, res) => {
  const multimedia = await Multimedia.findById(req.params.multimediaId);
  res.send(multimedia);
};

const update = async (req, res) => {
  const multimedia = await Multimedia.findByIdAndUpdate(
    req.params.multimediaId,
    req.body,
    {
      new: true,
    }
  );
  res.send(multimedia);
};

const remove = async (req, res) => {
  const multimedia = await Multimedia.findByIdAndDelete(
    req.params.multimediaId,
    req.body,
    {
      new: true,
    }
  );
  res.send(multimedia);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
