const mongoose = require("mongoose");

const Todoschema = mongoose.Schema({
  name: String,
  description: String,
  completed: String,
  });
 const data=mongoose.model("todo",Todoschema)

module.exports = data;
