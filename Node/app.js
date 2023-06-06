const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Image API Home Page");
});


module.exports.handler = async (event, context) => {
  const serverlessHandler = app;
  
  return new Promise((resolve, reject) => {
    const callback = (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    };
    
    serverlessHandler(event, context, callback);
  });
};
