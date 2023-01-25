/* eslint-disable no-unused-vars */

const path = require('path');
const express = require('express');
const app = express();

const { register, login } = require('../database/controllers/authentication.js');
//const bodyParser = require('body-parser');
//const goodbye = require('./routes/goodbye.js');

app.use(express.static(path.join(__dirname, '../client/dist')));

// connect to db
const db = require('../database/index.js');

// db controllers
const User = require('../database/controllers/user.js');


// ----  Routes ---- //

app.get('/goodbye', (req, res) => {
  //console.log('path', path.join(__dirname, '../client/dist/index.html'));
  //res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  res.send('Thanks For Visiting');
  //console.log('HERE');
  //User.addExampleUser(req, res);
});

// ---- Trip Completion  ---- //

app.post('/database', async (req, res) => {
  console.log('server/index.js - app.post - /database - here');
  await User.addExampleUser()
  res.send('complete')
})

// ---- Authentication  ---- //

// Register Endpoint
app.post('/register', register);

// Login Endpoint
app.post('/login', login);



// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// ---- Set Port and Listen For Requests ---- //

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}, on this path ${path.join(__dirname, '../client/dist')}`);
});

//module.exports = server;