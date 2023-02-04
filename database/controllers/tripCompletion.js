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
    console.log('ID', userId)
    let id = {_id: userId};
    let user = await User.find(id).catch(err => console.log('ERR FINDING: ', err))
    return user;
  },

  // start user's rider route trip
  startTrip: async (_id) => {
    console.log('Here we are ID', _id);
    let users = await User.find( { _id } ).catch(err => console.log('ERR FINDING: ', err))
    let user = users[0];
    console.log('USER:', user);
    user.rider_route.started = true;
    await user.save()
    console.log('USER2:', user);
    return 'started trip';
  },

  // end user's trip (rider or driver)
  endTrip: async (_id) => {
    console.log('Lets Do This: ', _id);
    let users = await User.find( { _id } ).catch(err => console.log('ERR FINDING: ', err))
    let user = users[0];
    console.log('USER:', user);

    // end route as a rider
    if (user.rider_route.started) {
      // add rider_route to rider_trips
      user.rider_trips.push(user.rider_route)
      // reset rider_route
      user.rider_route = {
        started: false
      }
      await user.save();
    }

    // end route as driver
    if (user.driver_route.started) {
      // add driver route to driver_trips
      user.driver_trips.push(user.driver_route);
      // for all riders
      for (var riderId of user.driver_route.riders) {
        let riders = await User.find( { _id: riderId } ).catch(err => console.log('ERR FINDING: ', err))
        let rider = riders[0];
        // add rider_route to rider_trips
        rider.rider_trips.push(rider.rider_route);
        // remove rider_route
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
    console.log('Lets Do This: ', user_id, favorite_user_id);
    let users = await User.find( { _id: user_id } ).catch(err => console.log('ERR FINDING: ', err))
    let user = users[0];
    console.log('USER:', user);

    user.favorites.push(favorite_user_id);
    await user.save();
    console.log('After favorite:', user);

    return 'favorite added!'
  }

};
