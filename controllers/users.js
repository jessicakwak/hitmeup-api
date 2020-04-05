// Require
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// Routes
//user sign up
router.post("/signup", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        //if email exist in the database
        res.send("User already exists");
      } else {
        //if there is no email, first hash the input password
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        //After then, create a user based on input info
        Users.create(req.body)
          .then(response => {
            //issue a token for the user
            let token = jwt.sign(response.toObject(), process.env.SECRET);
            res.send({
              //send back created data minus password
              token: token,
              name: response.name,
              email: response.email,
              image: response.image,
              intro: response.intro
            });
          })
          .catch(err => res.send(err));
      }
    })
    .catch(err => res.send(err));
});

//user login
router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(data => {
      if (data) {
        //if there is an email registered
        if (bcrypt.compareSync(req.body.password, data.password)) {
          //if the password matches, issue token, retrieve data and send back
          let token = jwt.sign(data.toObject(), process.env.SECRET);
          res.send({
            token: token,
            name: data.name,
            email: data.email,
            image: data.image,
            intro: response.intro
          });
        } else {
          //email is registered but password no match
          res.send("nomatch");
        }
      } else {
        //email does not exist
        res.send("noemail");
      }
    })
    .catch(err => res.send(err));
});

//get user info by object ID
router.get("/", (req, res) => {
  Users.findById(req.query.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// Export
module.exports = router;
