// Require
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Model
module.exports = mongoose.model("channels", {
  name: {
    type: String,
    required: true
  }
});
