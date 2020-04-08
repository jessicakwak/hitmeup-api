// Require
const mongoose = require("mongoose");

// Model
module.exports = mongoose.model("users", {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/jesskcloud/image/upload/v1586074585/defaultUser_pemjci.png"
  },
  intro: {
    type: String,
    default: ""
  }
});
