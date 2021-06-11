if (process.env.NODE_ENV === "prod") require("dotenv").config()
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || "development"
const config = require("./app/config/mongoConfig.json")
const express = require("express")
const app = express()

app.use([
  express.json(),
  express.urlencoded({
    extended: true,
  }),
])

mongoose.connect('mongodb://mongo-db/' + config[env].database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

require("./app/router")(app)

module.exports = app
