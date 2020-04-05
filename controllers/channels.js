// Require
const Channels = require("../models/channels");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// Routes
router.post("/", (req, res) => {
  try {
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
    Channels.create(req.body).then(channel => {
      res.send(channel);
      console.log(`The new channel ${req.body.name} was created`);
    });
  } catch (err) {
    res.send("Not a valid token");
    console.log(err);
  }
});
router.get("/", (req, res) => {
  try {
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
    Channels.find({}).then(data => res.send(data));
  } catch (err) {
    res.send("Not a valid token");
    console.log(err);
  }
});

// Export
module.exports = router;
