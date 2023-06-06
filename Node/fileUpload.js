"use strict";
const express = require("express");
const Images = require("./src/model/fileModel");
const student = require("./src/model/studentModel");
const imageRouters = require("./src/routes/fileRoutes");
const sequelize = require("./src/database/studentdb");
const serverlessHttp = require("serverless-http");
const sendEmail = require('./sendEmail');

const app = express();
// const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Image Api Home Page");
});

app.use("/", imageRouters);

sequelize
  .sync()
  .then((result) => {
    // app.listen(5000);
    // console.log(`Server is running on port ${port} Please Open In Browser Or API in PostMan`);
  })
  .catch((err) => {});
module.exports.handler = serverlessHttp(app);
