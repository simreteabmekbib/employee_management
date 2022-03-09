// Imported required packages
const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose");

require('dotenv').config(); // automatically loads environment variables from a . env file into the process
// MongoDB Databse url
var mongoDatabase = process.env.DB_URI;

// Created express server
//promise and global to use mongoose anywhere as Async when writing mongoose
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database //prevent deprecated with the newer parser
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("There is problem while connecting database " + err);
  }
);

// All the express routes
const employeeRoutes = require("../Routes/Employee.route");

// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS middleware
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 5000;

// Routes Configuration
app.use("/employees", employeeRoutes);

// Staring our express server
const server = app.listen(port, function () {
  console.log("Server Lisening On Port : " + port);
});
