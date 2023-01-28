/* eslint-disable no-unused-vars */

const path = require('path');
const express = require('express');
const app = express();
const auth = require('./auth.js');
const { register, login } = require('../database/controllers/authentication.js');
const { getDriverView, getRiderView, postDriverRoute, postRiderRoute } = require('../database/controllers/defaultviews.js')
//const goodbye = require('./routes/goodbye.js');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

// connect to db
const db = require('../database/index.js');

// db controllers
const User = require('../database/controllers/user.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// ----  Routes ---- //


//get routes
app.get('/goodbye', (req, res) => {
  res.send('Thanks For Visiting');
});

//app.get('/reviews/:product_id/:count/:sort', getReviewsHandler);


//post routes
//app.post('/reviews', postReviewHandler);


//put routes
//app.put('/reviews/:review_id/report', updateReportForReview);
//app.put('/reviews/:review_id/helpful', updateHelpfulCountsForReview);

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
app.get('/getdriverview', function(req, res) {
  let userid = req.query.id;
  getDriverView(userid)
  .then((result) => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
});

// ---- Default Rider view routes  ---- //
app.get('/getriderview', function(req, res) {
  let userid = req.query.id;
  getRiderView(userid)
  .then((result) => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
});

app.post('/postDriverRoute', function(req, res) {
  var data = req.body.data;
  postDriverRoute(data)
  .then(result => res.end())
  .catch(err => console.log(err))
})

app.post('/postRiderRoute', function(req, res) {
  console.log(req.body.data)
  var data = req.body.data;
  postRiderRoute(data)
  .then(result => res.end())
  .catch(err => console.log(err))
})

// ---- Catch all for routing ---- //

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// ---- Set Port and Listen For Requests ---- //

// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}, on this path ${path.join(__dirname, '../client/dist')}`);
});

//module.exports = server;