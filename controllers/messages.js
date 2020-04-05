// Require
const Messages = require("../models/messages");
const jwt = require("jsonwebtoken");
const path = require("path");
const router = require("express").Router();

// Routes
//post request
router.post("/", (req, res) => {
  //token first
  let tokenUser = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.SECRET
  );
  req.body.user = tokenUser;
  //create messages here
  Messages.create(req.body)
    .then(message => {
      Messages.findById(message._id)
        .populate("user channel")
        .then(mes => res.send(mes));
    })
    .catch(err => res.send(err));
});

//get request
router.get("/", (req, res) => {
  try {
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
    Messages.find({ channel: req.query.channel })
      .populate({ path: "user", select: "_id name email" })
      .then(data => res.send(data));
  } catch (err) {
    res.send("This is not a valid token");
    console.log(err);
  }
});

// Export
module.exports = router;
