const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;
const bcrypt = require('bcrypt');
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

app.post('/register', (request, response) => {
  bcrypt
    .hash(request.query.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        full_name: 'blake',
        email: request.query.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: 'User Created Successfully',
            result: result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating user',
            error: error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: 'Password was not hashed successfully',
        error: error,
      });
    });
});

// set port and listen for requests

// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(`listening on port ${port}, on path ${path.join(__dirname, '../client/dist/index.html')}`);
});

//module.exports = server;