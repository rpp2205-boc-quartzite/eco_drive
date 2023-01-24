/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable padded-blocks */

const User = require('../models/user');

module.exports = {

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

  clearUsers: async () => {
    console.log('called clear');
    await User.deleteMany( {} );
    console.log('cleared');
    return;
  }

};
