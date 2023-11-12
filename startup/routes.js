require("express-async-errors");
const express = require("express");
const morgan = require("morgan");

module.exports = function (app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/api/users", require("../routes/users"));

  app.use("/api/genres", require("../routes/genres"));
  app.use("/api/bands", require("../routes/bands"));
  app.use("/api/multimedia", require("../routes/multimedia"));

  app.get("/ping", (req, res) => {
    res.send({ success: true });
  });

  app.use(require("../middlewares/errors"));
};
