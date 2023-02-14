/* eslint-disable no-unused-vars */
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const auth = require('./auth.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// connect to db
const db = require('../database/index.js');

// db controllers
const tripComplete = require('../database/controllers/tripComplete.js');
const { getDriverList, addFavorite, removeFavorite } = require('../database/controllers/driverList.js')
const { calculateDistance } = require('./helpers/driverListHelpers.js');
const { getRiderArray, addDriversRoute, removeRiderFromRiderArray} = require ('../database/controllers/riderList.js');

const { postReviewHandler } = require('../database/controllers/reviews.js');
const { postReportHandler } = require('../database/controllers/report.js');
const { register, login, validate, sendMail, changePassword, uniqueEmailCheck } = require('../database/controllers/authentication.js');
const { updateDriverProfile, updateRiderProfile, getUserInfo } = require('../database/controllers/userProfile.js')
const { getDriverView, getRiderView, postDriverRoute, postRiderRoute, postDriverLicense, removeIdOffRiderListOfDriver, postDefaultRiderRoute, postDefaultDriverRoute } = require('../database/controllers/defaultviews.js')

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

// ---- Trip Completion  ---- //

// test database user insertion
app.post('/database', async (req, res) => {
  // console.log('server/index.js - app.post - /database - here');
  await tripComplete.addExampleUser()
  res.send('complete')
})

// start route
app.put('/start-route/:_id/:route', async (req, res) => {
  let result = await tripComplete.startRoute(req.params._id, req.params.route)
  res.send(result);
})

// end route (send back passenger ID list)
app.put('/end-trip/:_id/:route', async (req, res) => {
  let result = await tripComplete.endTrip(req.params._id, req.params.route)
  console.log('RESULTT:', result);
  res.send(result);
})

// add favorite
app.put('/favorite/:user_id/:favorite_user_id', async (req, res) => {
  let result = await tripComplete.addFavorite(req.params._id, req.params.favorite_user_id)
  res.send(result);
})

// remove favorite
app.put('/unfavorite/:user_id/:favorite_user_id', async (req, res) => {
  let result = await tripComplete.removeFavorite(req.params.user_id, req.params.favorite_user_id)
  res.send(result);
})

// cancel rider trip
app.put('/cancel-rider-route/:user_id', async (req, res) => {
  let result = await tripComplete.cancelRiderRoute(req.params.user_id)
  res.send(result);
})

// cancel driver trip
app.put('/cancel-driver-route/:user_id', async (req, res) => {
  let result = await tripComplete.cancelDriverRoute(req.params.user_id)
  res.send(result);
})




// ---- Authentication  ---- //

app.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me' });
});

app.post('/register', register);
app.post('/login', login);
app.get('/validate', validate);
app.post('/sendMail', sendMail);
app.put('/change-password', changePassword);
app.get('/unique-email-check', uniqueEmailCheck);

// ---- Default Driver & Rider view routes  ---- //
app.get('/getdriverview', function(req, res) {
  let userid = req.query.userId;
  getDriverView(userid)
  .then((result) => {
    res.send(result)
  })
  .catch(err => console.log(err))
});

app.get('/getriderview', function(req, res) {
  let userid = req.query.userId;
  getRiderView(userid)
  .then((result) => {
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
  postRiderRoute(req.body)
  .then(() => res.status(201).send('Successfully post rider route'))
  .catch((err) => res.status(400).send(err))
});

app.post('/postDriverLicense', function(req, res) {
  // console.log('here is license', req.body.licenseInfo)
  var data = req.body.licenseInfo;
  postDriverLicense(data)
  .then(result => res.end())
  .catch(err => console.log(err))
})

app.post('/rider/:_id/defaultroute', function(req, res) {
  let data = req.body.data;
  postDefaultRiderRoute(data)
  .then(result => res.end())
  .catch(err => console.log('err',err))
})

app.post('/driver/:_id/defaultroute', function(req, res) {
  let data = req.body.data;
  postDefaultDriverRoute(data)
  .then(result => res.end())
  .catch(err => console.log('err',err))
})

// ---- Ratings and Reviews routes  ---- //
app.get('/getreviews', function(req, res) {
  let userid = req.query.id;
  getRiderView(userid)
  .then((result) => {
    // console.log(result[0].full_name);
    res.send(result[0]);
  })
  .catch(err => console.log(err))
});

//app.get('/reviews/:product_id/:count/:sort', getReviewsHandler);

app.post('/newreview', (req, res) => {
  let review = req.body;
  postReviewHandler(review)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

app.post('/reviews/:user_id/report', (req, res) => {
  let report = req.body;
  report.user_id = req.params.user_id;
  postReportHandler(report)
  .then((response) => {
    res.status(201).send(response);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

// app.put('/reviews/:review_id/report', updateReportForReview);
// app.put('/reviews/:review_id/helpful', updateHelpfulCountsForReview);


// ------------------------------------------------------------------------------------------ //
// ----------------------------------- Driver List Routes ----------------------------------- //
// ------------------------------------------------------------------------------------------ //
app.post('/driver-list', async (req, res) => {
  const rider =  {
    _id: req.body._id,
    start_address: req.body.start_address,
    start_lat: req.body.start_lat,
    start_lng: req.body.start_lng,
    end_address: req.body.end_address,
    end_lat: req.body.end_lat,
    end_lng: req.body.end_lng,
    time: req.body.time,
  }
  const driverList = [];

  try {
    const activeDrivers = await getDriverList(req.body._id);
    for (let driver of activeDrivers) {
      const startDistance = await calculateDistance(rider.start_lat, rider.start_lng, driver.driver_route.start_lat, driver.driver_route.start_lng);
      const endDistance = await calculateDistance(rider.end_lat, rider.end_lng, driver.driver_route.end_lat, driver.driver_route.end_lng);
      if (startDistance !== undefined && endDistance !== undefined) {
        driverList.push({driverInfo: driver, startDistance, endDistance})
      }
      // console.log(driverList)
      driverList.sort((a, b) => {
        return a.startDistance.value - b.startDistance.value
      })
    }
    res.status(200).send(driverList)
  } catch (err) {
    console.log('Get driver list server err: ', err)
    res.status(404).send(err)
  }
})

// Add/remove driver to/off user's favorites list
app.put('/driver-list', async (req, res) => {
  // console.log('/driver-list', req)
  try {
    if (req.query.action === 'add-favorite') {
      await addFavorite(req.query.userId, req.query.driverId)
      res.status(204).send('Successfully favorite driver')
    } else if (req.query.action === 'remove-favorite') {
      await removeFavorite(req.query.userId, req.query.driverId)
      res.status(204).send('Successfully unfavorite driver')
    }
  } catch (err) {
    console.log('Error add or remove favorite driver: ', err);
    res.status(400).send(err)
  }
})

// ---- User Profile Routes ---- //

app.get('/getuserinfo', function(req, res) {
  let userid = req.query.id;
  // console.log('USERID in INDEXJS server', req.query.id)
  getUserInfo(userid)
  .then((result) => {
    // console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
});

app.post('/updateDriverProfile', function(req, res) {
  // console.log('DATA IN INDEX.JS SERVER', req.body)
  var data = req.body;
  updateDriverProfile(data)
  .then(result => {
    console.log('result in index.js server', result)
    res.end()
  })
  .catch(err => console.log(err))
});
app.post('/updateRiderProfile', function(req, res) {
  // console.log('DATA IN INDEX.JS RIDER SERVER', req.body)
  var data = req.body;
  updateRiderProfile(data)
  .then(result => {
    console.log('result in index.js server', result)
    res.end()
  })
  .catch(err => console.log(err))
});
//---- User Profile Routes End ---- //
// ###################################################################################//
// ----------------------------------- Rider List ----------------------------------- //
// ###################################################################################//

app.post('/rider-list', async (req, res) => {
  const driver =  {
    id: req.body.userId,
    start_address: req.body.start_address,
    start_lat: req.body.start_lat,
    start_lng: req.body.start_lng,
    end_address: req.body.end_address,
    end_lat: req.body.end_lat,
    end_lng: req.body.end_lng,
    time: req.body.time,
  }
  const driverID = req.body.userId
  const seats = req.body.total_seats;

  try {
    const assignedRiders = await getRiderArray(driverID);
    Promise.all(assignedRiders)
      .then((riders) => {
        res.status(200).send({riders: riders, seats: seats});
      })
  }
  catch (err) {
    console.log('The Following Error Occured When Attempting to Capture Riders: ', err)
    res.status(404).send(err)
  }
});

app.post("/add-driver-route", (req, res) => {
  const driver =  {
    id: req.body.info.id,
    start_address: req.body.info.start_address,
    start_lat: req.body.info.start_lat,
    start_lng: req.body.info.start_lng,
    end_address: req.body.info.end_address,
    end_lat: req.body.info.end_lat,
    end_lng: req.body.info.end_lng,
    time: req.body.info.time,
    total_seats: req.body.info.total_seats,
    started: false,
    distance: req.body.distance,
    riders: []
  }


  addDriversRoute(driver)
    .then((results) => {
      res.status(204).send(results);
    })
    .catch((err) => {
      console.log('Error: ', err)
    });

})

app.post("/rider-remove", async (req, res) => {
    const driverID = req.body.driverID;
    const riderID = req.body.riderID;
      try {
        // This will both get rider's id off driver_route.riders list and reset rider's rider_route
        const removedRiders = await tripComplete.cancelRiderRoute(riderID, driverID);
        res.status(200).send(removedRiders);
      }
      catch (err) {
        console.log('The Following Error Occured When Attempting to Remove Riders: ', err)
        res.status(404).send(err)
      }
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

// const server = app.listen(port, () => {
//   console.log(`listening on port ${port}, on this path ${path.join(__dirname, '../client/dist')}`);
// });

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {console.log(`Listening on port ${port}`)});
} else {
  const server = app.listen(port, () => {console.log(`Listening on port ${port}`)});
  module.exports = server;
}

// module.exports = server;