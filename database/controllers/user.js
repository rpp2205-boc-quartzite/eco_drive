const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {

  // test adding a fake user
  addExampleUser: async () => {
    console.log('called');
    const user = new User({
      full_name: 'cam the man',
      email: 'camjhirsh@gmail.com'
    });
    await user.save();
    console.log('saved new user');
    return;
  },

  // erase all users from collection *CAUTION
  clearUsers: async () => {
    console.log('called clear');
    await User.deleteMany( {} );
    console.log('cleared');
    return;
  },

  // user: { fullname, email, password, license, ... }
  addUser: async (user) => {
    console.log('adding user');
    const user = new User(user);
    await user.save();
    console.log('wrote new user');
    return;
  },

  // update a user with new route
  updateUserRoute: async (userId, route) => {
    await User.findOneAndUpdate( { _id: userId },
      updates
    );
    return;
  }

  // add a completed trip to a user
  updateUserRoute: async (userId, trip) => {
    await User.findOneAndUpdate( { _id: userId },
      updates
    );
    return;
  }
};
