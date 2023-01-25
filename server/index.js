/* eslint-disable no-unused-vars */

const path = require('path');
const express = require('express');
const app = express();
const auth = require('./auth.js');
const { register, login } = require('../database/controllers/authentication.js');
const { getDriver, getRider } = require('../database/controllers/defaultviews.js')
const bodyParser = require('body-parser');
//const goodbye = require('./routes/goodbye.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

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

app.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me' });
});

// Register Endpoint
app.post('/register', register);

// Login Endpoint
app.post('/login', login);


// ---- Default Driver view routes  ---- //
app.get('/driverview', function(req, res) {
  let userid = req.query.id;
  getDriver(userid)
  .then((result) => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
});

// ---- Default Rider view routes  ---- //
app.get('/riderview', function(req, res) {
  let userid = req.query.id;
  getRider(userid)
  .then((result) => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
});


// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// ---- Set Port and Listen For Requests ---- //

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}, on this path ${path.join(__dirname, '../client/dist')}`);
});

//module.exports = server;