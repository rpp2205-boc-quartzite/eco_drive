const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js').User;

module.exports = {
  register: (req, res) => {
    bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashedPassword,
        dob: req.body.dob,
        drivers_license: req.body.drivers_license,
        license_plate: req.body.license_plate,
        is_driver: req.body.is_driver
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
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.pass, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return res.status(400).send({
              message: 'Password does not match',
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
        message: 'Email Not Found',
        error: error,
      });
    });
  }
};

