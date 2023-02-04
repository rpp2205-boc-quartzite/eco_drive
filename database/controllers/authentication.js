const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js').User;
const nodemailer = require('nodemailer');
require("dotenv").config();

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
            user: user.id,
            driver: user.is_driver,
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
  },

  validate: (req, res) => {
    const token = req.body.token;
    console.log(token)
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
  
    jwt.verify(token, 'RANDOM-TOKEN', (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      res.status(200).send(decoded);
    });
  },

  sendMail: (req, res) => {
    console.log(req)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD
      }
    });
    
    var mailOptions = {
      from: 'ecodrivecare@gmail.com',
      to: req.body.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, data){
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully");
        res.json({ status: "Email sent" });
      }
    });
  }
};

