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

  // remove all users from database
  clearUsers: async () => {
    await User.deleteMany( {} );
  },

  // get one user by ID
  getUser: async (userId) => {
    // console.log('ID', userId)
    let id = {_id: userId};
    let user = await User.find(id).catch(err => console.log('ERR FINDING: ', err))
    return user;
  },

  // start route
  startRoute: async (_id, route) => {
    let user = await User.find({ _id })
    console.log('Before:', user)
    const result = await User.updateOne({ _id }, {$set: {[`${route}_route.started`]: true}}).catch(err => console.log(err));
    user = await User.find({ _id })
    console.log('After:', user)
    return 'started trip';
  },

  // end a trip (& send back passenger ID list)
  endTrip: async (_id, route) => {
    let user = await User.find({ _id })
    console.log('Before:', user)

    if (route === "driver") {
      let rider_list = user.driver_route.riders;
      await User.updateOne({ _id }, {$set: {driver_route: { started: false }}}).catch(err => console.log(err));

    } else if (route == "rider") {
      let driver = await User.find({ _id: [user.rider_route.driver_id] }).catch(err => console.log(err));
      let rider_list = driver.driver_route.riders;
      rider_list.push(driver._id);
      await User.updateOne({ _id }, {$set: {driver_route: { started: false }}}).catch(err => console.log(err));
    }

    user = await User.find({ _id })
    console.log('After:', user)
    return rider_list;
  },

  // add a favorite to a user's list
  addFavorite: async (user_id, favorite_user_id) => {
    // console.log('Lets Do This: ', user_id, favorite_user_id);
    let users = await User.find( { _id: user_id } ).catch(err => console.log('ERR FINDING: ', err))
    let user = users[0];
    console.log('USER:', user);

    user.favorites.push(favorite_user_id);
    await user.save();
    console.log('After favorite:', user);

    return 'favorite added!'
  }

};
