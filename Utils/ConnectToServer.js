require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ConnectToServer = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => console.log(e, "Error"));

module.exports = ConnectToServer;
