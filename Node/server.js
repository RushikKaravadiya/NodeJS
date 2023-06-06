const express = require('express');
const studentRouters = require("./src/routes/studentRoutes");
const sequelize = require("./src/database/studentdb");
const Images = require('./src/model/fileModel');
const serverlesshttp = require('serverless-http');

const app = express();
// const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Good Morning");
})

app.use("/", studentRouters);

sequelize.sync()
    .then(result => {
        // app.listen(3000);
        // console.log(`Server is running on port ${port} Please Open In Browser Or API in PostMan`);
    })
    .catch(err => {
    })


module.exports.student = serverlesshttp(app);