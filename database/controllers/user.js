const User = require('../models/user.js').User;

module.exports = {

  // test adding a fake user
  addExampleUser: async () => {
    const doc = new User({
      full_name: 'cam the man',
      email: 'camjhirsh@gmail.com'
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
