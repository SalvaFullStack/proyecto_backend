require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/api/users", require("../routes/users"));
  app.use(cors());
  app.use("/api/teams", require("../routes/teams"));
  app.use("/api/matchday", require("../routes/matchday"));

  app.get("/ping", (req, res) => {
    res.send({ success: true });
  });

  app.use(require("../middlewares/errors"));
};
