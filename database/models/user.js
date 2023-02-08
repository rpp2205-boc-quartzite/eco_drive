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
  license_plate:    String,
  dob:              String,
  avatar: {
    type: String,
    default: 'https://i.pinimg.com/474x/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg'
  },
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
    started: {
      type: Boolean,
      default: false,
    },
    start_address:  String,
    end_address:    String,
    start_lat:      Number,
    start_lng:      Number,
    end_lat:        Number,
    end_lng:        Number,
    time:           String,
    total_seats:    Number,
    default:        Boolean,
    riders: [
      {
        rider_id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User'
        },
        starting_distance: String,
        end_distance: String,
      }
    ]
  },

  default_driver_route: {
    start_address:  String,
    end_address:    String,
    start_lat:      Number,
    start_lng:      Number,
    end_lat:        Number,
    end_lng:        Number,
    time:           String,
    total_seats:    Number,
    default:        {
      type: Boolean,
      default: false,
    },
  },

  rider_route: {
    started: {
      type: Boolean,
      default: false,
    },
    start_address:  String,
    end_address:    String,
    start_lat:      Number,
    start_lng:      Number,
    end_lat:        Number,
    end_lng:        Number,
    time:           String,
    default:        Boolean,
    driver_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  },

  default_rider_route: {
    start_address:  String,
    end_address:    String,
    start_lat:      Number,
    start_lng:      Number,
    end_lat:        Number,
    end_lng:        Number,
    time:           String,
    default:        {
      type: Boolean,
      default: false,
    }
  },

  driver_trips: [
    {
      start_address:  String,
      end_address:  String,
      start_lat:      Number,
      start_lng:      Number,
      end_lat:        Number,
      end_lng:        Number,
      time: String,
      number_of_riders: {
        type: Number,
        default: 0,
      }
    }
  ],

  rider_trips: [
    {
      start_address: String,
      end_address: String,
      start_lat:      Number,
      start_lng:      Number,
      end_lat:        Number,
      end_lng:        Number,
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
      rating: {
        type: Number,
        default: 0,
      },
      full_name: String,
      review_summary: String,
      review_text:  String
    }
  ],

  rider_reviews: [
    {
      reviewer_user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        default: 0,
      },
      full_name: String,
      review_summary: String,
      review_text: String
    }
  ],

  reported: [
    {
      reporter_user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      },
      report_text: String,
      full_name: String
    }
  ],

  favorites: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
    default: []
  }

}, { collection: 'user' });

// const userSchema = mongoose.Schema({
//   full_name: String,
//   email: String
// })

const User = mongoose.model('User', userSchema);

module.exports.User = User;
