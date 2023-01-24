/* eslint-disable comma-dangle */
/* eslint-disable key-spacing */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  full_name:        String,
  email:            String,
  password:         String,
  drivers_license:  String,
  avatar:           String,
  is_driver:        Boolean,
  is_rider:         Boolean,

  recent_drivers: [
    { user_id: Number }
  ],
  recent_riders: [
    { user_id: Number }
  ],

  driver_route: {
    started:        Boolean,
    start_address:  String,
    end_address:    String,
    latitude:       String,
    longitude:      String,
    time:           String,
    total_seats:    Number,
    default:        Boolean,
    riders:         [
      { user_id: Number }
    ]
  },

  rider_route: {
    started:  Boolean,
    start_address: String,
    end_address:  String,
    time:  String,
    default: Boolean,
    driver_id: Number
  },

  driver_trips: [
    {
      start_address:  String,
      end_address:  String,
      time: String,
      number_of_riders: Number
    }
  ],

  rider_trips: [
    {
      start_address: String,
      end_address: String,
      time: String,
      driver_id: Number
    }
  ],

  driver_reviews: [
    {
      reviewer_user_id: Number,
      rating: Number,
      review_text:  String
    }
  ],

  rider_reviews: [
    {
      reviewer_user_id: Number,
      rating: Number,
      review_text: String
    }
  ]

}, { collection: 'user' });

// const userSchema = mongoose.Schema({
//   full_name: String,
//   email: String
// })

const User = mongoose.model('User', userSchema);

module.exports.User = User;
