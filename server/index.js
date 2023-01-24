const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;
const { register, login } = require('../database/controllers/authentication.js');
//const goodbye = require('./routes/goodbye.js');

// connect to db
const db = require('../database/index.js');

// db controllers
const User = require('../database/models/user');

app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
app.get('/goodbye', (req, res) => {
  //console.log('path', path.join(__dirname, '../client/dist/index.html'));
  //res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  res.send('Goodbye');
  //console.log('HERE');
  //User.addExampleUser(req, res);
});

// ---- Authentication Routes ---- //

// Register Endpoint 
app.post('/register', register);

// Login Endpoint
app.post("/login", login);

// set port and listen for requests

// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(`listening on port ${port}, on path ${path.join(__dirname, '../client/dist/index.html')}`);
});

//module.exports = server;