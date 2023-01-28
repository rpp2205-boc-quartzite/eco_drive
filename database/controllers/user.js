const User = require('../models/user.js').User;

module.exports = {

  // test adding a fake user
  addExampleUser: async () => {
    const doc = new User({
      full_name: 'john smith',
      email: 'jsmith@yahoo.com'
    });
    await doc.save();
  },

  // clear the users collection
  clearUsers: async () => {
    await User.deleteMany( {} );
  },

  // once completed, add a trip to a user document
  // addTrip: async (_id) => {
  //   await User.findOne
  // }

};
