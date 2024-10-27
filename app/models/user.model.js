const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    mobile: String,
    password: String,
    //token:String
  })
);

module.exports = User;
