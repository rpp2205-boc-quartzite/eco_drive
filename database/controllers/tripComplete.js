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
    let users = await User.find({ _id })
    let user = users[0];
    console.log('Before:', user)

    if (route === "driver") {
      let rider_list = user.driver_route.riders;
      await User.updateOne({ _id }, {$set: {recent_riders: rider_list}}).catch(err => console.log(err));
      await User.updateOne({ _id }, {$set: {driver_route: { started: false }}}).catch(err => console.log(err));
      user = await User.find({ _id })
      console.log('After:', user)
      return rider_list;

    } else if (route === "rider") {
      let drivers = await User.find({ _id: [user.rider_route.driver_id] }).catch(err => console.log(err));
      let driver = drivers[0];
      await User.updateOne({ _id }, {$push: {recent_drivers: driver._id}}).catch(err => console.log(err));
      let rider_list = driver.driver_route.riders;
      rider_list.push(driver._id);
      await User.updateOne({ _id }, {$set: {rider_route: { started: false }}}).catch(err => console.log(err));
      user = await User.find({ _id })
      console.log('After:', user)
      return rider_list;
    }
  },

  // add a favorite to a user's list
  addFavorite: async (userId, driverId) => {
    const filter = {_id: userId};
    await User.updateOne(filter, {$push: {favorites: driverId}}).catch(err => console.log(err));
    return 'Successfully favorite driver'
  },

  // remove a favorite from a user's list
  removeFavorite: async (userId, driverId) => {
    const filter = {_id: userId};
    await User.updateOne(filter, {$pull: {favorites: driverId}}).catch(err => console.log(err));
    return 'Successfully unfavorite driver'
  },

  // cancel rider route
  cancelRiderRoute: async (_id) => {
    const filter = {_id };
    await User.updateOne(filter, {$set: {rider_route: { started: false }}}).catch(err => console.log(err));
    return 'Successfully cancelled route'
  },

  // cancel driver route
  cancelDriverRoute: async (_id) => {
    const filter = {_id };
    await User.updateOne(filter, {$set: {driver_route: { started: false , riders: []}}}).catch(err => console.log(err));
    return 'Successfully canceled route'
  }

};
