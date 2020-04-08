// Require
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const DataUri = require("datauri");
const path = require("path");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinary_NAME,
  api_key: process.env.cloudinary_API,
  api_secret: process.env.cloudinary_SECRET
});

// Routes
//user sign up
router.post("/signup", upload.single("image"), (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(data => {
      console.log(data);
      if (data) {
        //if email exist in the database
        res.send("User already exists");
      } else {
        if (req.file) {
          const dataUri = new DataUri();
          let uri = dataUri.format(
            path.extname(req.file.originalname).toString(),
            req.file.buffer
          ).content;
          cloudinary.uploader.upload(uri).then(cloudinaryFile => {
            req.body.image = cloudinaryFile.url;
            req.body.password = bcrypt.hashSync(req.body.password, 10);
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
          });
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
          res.send({
            token: token,
            name: data.name,
            email: data.email,
            image: data.image,
            intro: data.intro
          });
        } else {
          res.send("nomatch");
        }
      } else {
        //if there is no email, first hash the input password
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
