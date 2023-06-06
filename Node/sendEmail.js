const express = require('express');
const emailController = require('./src/controller/sendEmailController');
const serverlessHttp = require('serverless-http');


// const port = 4000;
const app = express();
app.use(express.json());

app.post("/sendEmail",emailController.sendEmail);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

module.exports.Email = serverlessHttp(app);

