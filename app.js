require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 3000;

const app = express();
require("./startup/db")();
require("./startup/routes")(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
