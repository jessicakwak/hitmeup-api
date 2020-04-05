// Require
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("./db");

// App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/channels", require("./controllers/channels"));
app.use("/users", require("./controllers/users"));
app.use("/messages", require("./controllers/messages"));

// Server
app.listen(process.env.PORT, err => {
  err
    ? () => {
        throw err;
      }
    : console.log(`Ready on port ${process.env.PORT}`);
});

// Export
module.exports = app;
