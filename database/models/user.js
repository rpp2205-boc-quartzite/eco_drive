/* eslint-disable comma-dangle */
/* eslint-disable key-spacing */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  full_name:        String,
  email: {
    type: String,
    unique: true
  },
  password:         String,
  drivers_license:  String,
  avatar:           String,
  is_driver:        Boolean,
  is_rider:         Boolean,

  recent_drivers: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
  },
  recent_riders: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
  },

  driver_route: {
    started:        Boolean,
    start_address:  String,
    end_address:    String,
    latitude:       Number,
    longitude:      Number,
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
    driver_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
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
      driver_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    }
  ],

  driver_reviews: [
    {
      reviewer_user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      },
      rating: Number,
      review_text:  String
    }
  ],

  rider_reviews: [
    {
      reviewer_user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      },
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
