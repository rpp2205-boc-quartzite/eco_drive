const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path');
const app = express();
const port = 3001;
const goodbye = require('./routes/goodbye');

app.use(bodyParser.json());
app.use("/", goodbye);

// connect to db
//const db = require('../database/index');

// db controllers
//const User = require('../database/controllers/user');

// routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
//   console.log('HERE');
//   User.addExampleUser(req, res);
// });

// set port and listen for requests

// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//module.exports = server;