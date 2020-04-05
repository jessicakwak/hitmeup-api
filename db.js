// Require
const mongoose = require("mongoose");

// Connection
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    err
      ? () => {
          console.log(err);
        }
      : console.log("Connected to MongoDB");
  }
);

// Export
module.exports = mongoose;
