// server.js
const mongoose=require("mongoose");
//const app=express();
const express = require("express");
const cors = require("cors");
const path = require('path');
const connectDB = require("./app/config/db.config");
//const connectDB=require('./db.config');

const app = express();

var corsOptions = {
  //origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// Connect to the database
connectDB();

require("./app/routes/auth.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
