const express = require('express');
const Images = require('./src/model/fileModel');
const student = require('./src/model/studentModel');

const imageRouters = require('./src/routes/fileRoutes');
const sequelize = require('./src/database/studentdb');

const app = express();
const port = 5000;
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Image Api Home Page");
})

app.use("/",imageRouters);



sequelize.sync()
    .then(result => {
        app.listen(5000);
        console.log(`Server is running on port ${port} Plase Open In Browser Or API in PostMan`);
    })
    .catch(err => {
    })