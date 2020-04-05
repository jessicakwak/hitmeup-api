// Require
const Users = require("../models/users");
const Channels = require("../models/channels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// Routes
router.post("/signup", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        res.send("User already exists");
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        Users.create(req.body)
          .then(response => {
            let token = jwt.sign(response.toObject(), process.env.SECRET);
            res.send({
              token: token,
              name: response.name,
              email: response.email
            });
          })
          .catch(err => res.send(err));
      }
    })
    .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          let token = jwt.sign(data.toObject(), process.env.SECRET);
          res.send({ token: token, name: data.name, email: data.email });
        } else {
          res.send("nomatch");
        }
      } else {
        res.send("noemail");
      }
    })
    .catch(err => res.send(err));
});

router.get("/", (req, res) => {
  Users.findById(req.query.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// Export
module.exports = router;
