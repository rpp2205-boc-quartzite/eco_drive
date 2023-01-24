const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
app.post('/register', (req, res) => {
  bcrypt
    .hash(req.query.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        full_name: req.query.name,
        email: req.query.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: 'User Created Successfully',
            result: result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: 'Error Creating User',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Password was not hashed successfully',
        error: error,
      });
    });
});

// Login Endpoint
app.post("/login", (req, res) => {
  User.findOne({ email: req.query.email })
    .then((user) => {
      bcrypt
        .compare(req.query.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Password does not match",
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          res.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: 'Password does not match',
            error,
          });
        });
    })
    .catch((error) => {
      res.status(404).send({
        message: 'Email not found',
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