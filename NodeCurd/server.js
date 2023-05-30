const express = require('express');
const studentRouters = require("./src/student/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Good Morning");
})

app.use("/students",studentRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port} Plase Open In Browser Or API in PostMan`);
  });