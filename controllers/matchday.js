const Matchday = require("../models/matchday");

// const create = async (req, res) => {
//   const lastMatchDay = await Matchday.findOne().sort("-matchday");

//   const isFirstMatchDay = !lastMatchDay;

//   if (isFirstMatchDay) {
//     const { matches } = req.body;
//     const newMatchDay = await Matchday.create({ matches });

//     return res.send(newMatchDay);
//   }

//   const isCurrentMatchDay = lastMatchDay.current;

//   if (isCurrentMatchDay) {
//     return res
//       .status(400)
//       .send(
//         "Hay una jornada en juego, asegurate de cerrarla para crear la siguiente."
//       );
//   }

//   const { matches } = req.body;
//   const nextMatchDay = await Matchday.create({
//     matchday: lastMatchDay.matchday + 1,
//     matches,
//   });

//   res.send(nextMatchDay);
// };

// const close = async (req, res) => {
//   const lastMatchDay = await Matchday.findOne().sort("-matchday");

//   const isFirstMatchDay = !lastMatchDay;
//   const isCurrentMatchDay = lastMatchDay.current;

//   if (isFirstMatchDay || !isCurrentMatchDay) {
//     return res.status(404).send("No hay jornadas en juego");
//   }

//   lastMatchDay.current = false;

//   const updatedMatchDay = await lastMatchDay.save({ new: true });

//   return res.send(updatedMatchDay);
// };

const getAllMatchdays = async (req, res) => {
  try {
    const matchdays = await Matchday.find();
    res.status(200).json(matchdays);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las jornadas");
  }
};

const getByMatchDay = async (req, res) => {
  const matchday = await Matchday.findOne({
    matchday: req.params.matchday,
  }).populate("matches.homeTeam matches.awayTeam");

  if (!matchday) return res.status(404).send("La jornada no existe");

  res.send(matchday);
};

// const getLastMatchDay = async (req, res) => {
//   const lastMatchDay = await Matchday.findOne().sort("-matchday");

//   const isFirstMatchDay = !lastMatchDay;

//   if (isFirstMatchDay) {
//     return res.status(404).send("No hay jornadas en juego");
//   }

//   return res.send(lastMatchDay);
// };

const saveMatchday = async (req, res) => {
  try {
    const newMatchday = new Matchday(req.body);
    await newMatchday.save();
    res.status(201).json(newMatchday);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar la jornada");
  }
};

// const createMatchday = async (req, res) => {
//   try {
//     // Desestructurar el cuerpo de la solicitud para obtener matches
//     const { matches } = req.body;

//     // Crear la nueva jornada con los matches proporcionados
//     const newMatchday = await Matchday.create({ matches });

//     res.json(newMatchday);
//   } catch (error) {
//     console.error("Error al crear la jornada:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// const update = async (req, res) => {
//   const lastMatchDay = await Matchday.findOne().sort("-matchday");

//   const isFirstMatchDay = !lastMatchDay;
//   const isCurrentMatchDay = lastMatchDay.current;

//   if (isFirstMatchDay || !isCurrentMatchDay) {
//     return res.status(404).send("No hay jornadas en juego");
//   }

//   lastMatchDay.matches = req.body.matches;

//   const updatedMatchDay = await lastMatchDay.save({ new: true });

//   return res.send(updatedMatchDay);
// };

const remove = async (req, res) => {
  const matchday = await Matchday.findByIdAndDelete(req.params.matchdayId);
  res.send(matchday);
};

module.exports = {
  saveMatchday,

  getAllMatchdays,
  getByMatchDay,

  remove,
};
