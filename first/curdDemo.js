const express = require('express');
const bodyParser = require('body-parser'); 
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let data = [];

// Read existing data from JSON file
fs.readFile('data.json', 'utf8', (err, jsonData) => {
  if (!err) {
    data = JSON.parse(jsonData);
  }
});

// Save data to JSON file
const saveData = () => {
  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error saving data to file:', err);
    }
  });
};
// Route to render the form
app.get('/', (req, res) => {
  const message = req.query.message; 
  const message1 = req.query.message1;
  const message2 = req.query.message2;
  res.send(`
    <html>
    <head>
      <title>Basic Curd In NodeJs</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <script>
        setTimeout(function() {
          var alert = document.querySelector('.alert');
          if (alert) {
            alert.remove();
          }
        }, 1000);
      </script>
    </head>
    <body>
      ${message ? `<div class="alert alert-success">${message}</div>` : ''}
      ${message1 ? `<div class="alert alert-success">${message1}</div>` : ''}
      ${message2 ? `<div class="alert alert-danger">${message2}</div>`:''}
      <form action="/add" method="POST" class="form-inline">
      <div class="form-group d-flex justify-content-center">
      <input type="text" name="inputData" class="form-control" placeholder="Enter data" required>
      <div class="invalid-feedback">Please enter data.</div>
      </div>&nbsp;
        <button type="submit" class="btn btn-outline-success">Add</button>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th>Items</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${data
      .map(
        (item, index) => `
                <tr>
                  <td>${item}</td>
                  <td><a href="/edit/${index}" class="btn btn-outline-dark">Edit</a></td>
                  <td><a href="/delete/${index}" class="btn btn-outline-danger">Delete</a></td>
                </tr>
              `
      )
      .join('')}
        </tbody>
      </table>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </body>
    </html>
  `);
});

// Route to add new data
app.post('/add', (req, res) => {
  const { inputData } = req.body;
  if (inputData) {
    data.push(inputData);
    saveData();
    res.redirect('/?message=Data added successfully!');
    
  } else {
    res.redirect('/');
  }
});

// Route to edit data
app.get('/edit/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < data.length) {
    res.send(`
      <html>
      <head>
        <title>Basic Curd In NodeJs</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h2>Edit Data</h2>
          <form action="/update/${index}" method="POST" class="form-inline">
            <div class="form-group">
              <input type="text" name="inputData" class="form-control" value="${data[index]}" placeholder="Enter data" required>
            </div>&nbsp;
            <button type="submit" class="btn btn-outline-success">Update</button>
          </form>
        </div>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </body>
      </html>
    `);
  } else {
    res.send('Invalid index');
  }
});

// Route to update data
app.post('/update/:index', (req, res) => {
  const { index } = req.params;
  const { inputData } = req.body;
  if (index >= 0 && index < data.length && inputData) {
    data[index] = inputData;
    saveData();
    res.redirect('/?message1=Data Edit Successfully')
  }
  else{
    res.redirect('/');
  }
});

// Route to delete data
app.get('/delete/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < data.length) {
    data.splice(index, 1);
    saveData();
    res.redirect('/?message2=Data Deleted...')
  }
  else{
    res.redirect('/');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} Plase Open In Browser`);
});