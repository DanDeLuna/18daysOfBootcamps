const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/NewsocialMedia",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
//mongodb://localhost:27017/
module.exports = mongoose.connection;