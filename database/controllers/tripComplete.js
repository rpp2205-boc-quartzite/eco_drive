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

  // start user's route
  startRoute: async (_id, route) => {
    let user = await User.find({ _id })
    console.log('Before:', user)
    const result = await User.updateOne({ _id }, {$set: {[`${route}_route.started`]: true}}).catch(err => console.log(err));
    user = await User.find({ _id })
    console.log('After:', user)
    return 'started trip';
  },

  // end user's trip (rider or driver)
  endTrip: async (_id, route) => {
    // console.log('Lets Do This: ', _id);
    let users = await User.find( { _id } ).catch(err => console.log('ERR FINDING: ', err))
    let user = users[0];
    // console.log('USER:', user);

    // end route as a rider
    if (route == "rider") {
      // add rider_route to rider_trips
      user.rider_trips.push(user.rider_route)
      // reset rider_route
      user.rider_route = {
        started: false
      }
      await user.save();

    // end route as driver
    } else if (route == "driver") {
      // add driver route to driver_trips
      user.driver_trips.push(user.driver_route);
      // for all riders
      for (var riderId of user.driver_route.riders) {
        let riders = await User.find( { _id: riderId } ).catch(err => console.log('ERR FINDING: ', err))
        let rider = riders[0];
        rider.rider_trips.push(rider.rider_route);
        rider.rider_route = {
          started: false
        }
        await rider.save();
      }
      // remove driver route
      user.driver_route = {
        started: false
      }
      await user.save();
    }
    return 'ended trip!';
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
