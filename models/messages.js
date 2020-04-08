// Require
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Model
module.exports = mongoose.model("messages", {
  channel: {
    type: ObjectId,
    ref: "channels",
    required: true
  },
  user: {
    type: ObjectId,
    ref: "users",
    required: true
  },
  date: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});
