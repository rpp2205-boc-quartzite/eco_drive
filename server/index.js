/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable-next-line object-curly-newline */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
// app.use('/', express.static(path.join(__dirname, '../index.html')));

// connect to db
const db = require('../database/index');

// db controllers
const User = require('../database/controllers/user');

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
  console.log('HERE');
});

// test db entry
app.post('/database', (req, res) => {
  console.log('DIS ONE');
  User.addExampleUser(req, res);
})

// set port and listen for requests
const port = 3001;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}, on path ${path.join(__dirname, '../index.html')}`);
});

module.exports = server;
