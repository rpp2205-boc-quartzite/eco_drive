const User = require('../models/user.js').User;

module.exports = {
  getDriverView: (user) => {
    console.log('ID', user)
    let id = {_id: user};
    return User.find(id).then((user) => {return user}).catch(err => console.log(err))
  },

  getRiderView: (user) => {
    console.log('ID', user)
    let id = {_id: user};
    return User.find(id).then((user) => {return user}).catch(err => console.log(err))
  },

  postDriverRoute: (newRoute) => {
    const id = {_id: newRoute.userId}
    const update = {
      start_address: newRoute.start_address,
      start_lat: newRoute.start_lat,
      start_lng: newRoute.start_lng,
      end_address: newRoute.end_address,
      end_lat: newRoute.end_lat,
      end_lng: newRoute.end_lng,
      time: newRoute.time,
      total_seats: newRoute.total_seats,
      default: newRoute.default
    }
    return User.findOneAndUpdate(id, {driver_route: update}).then((result) => console.log('Updated user record with new route')).catch(err => console.log('Error updating record'));
  },

  postRiderRoute: async (newRoute) => {
    const user_id = {_id: newRoute._id}
    const update = {
      started: false,
      start_address: newRoute.start_address,
      start_lat: newRoute.start_lat,
      start_lng: newRoute.start_lng,
      end_address: newRoute.end_address,
      end_lat: newRoute.end_lat,
      end_lng: newRoute.end_lng,
      time: newRoute.time,
      default: newRoute.default,
      driver_id: newRoute.driver_id
    }
    try {
      // Update rider_router
      await User.findOneAndUpdate(user_id, {rider_route: update})
      // Add rider id to the driver's rider list
      await module.exports.addIdToRiderListOfDriver(newRoute.driver_id, newRoute._id)
      console.log('Updated user record with new rider route');
    } catch (err) {
      console.log('Error updating rider route: ', err);
    }
  },

  addIdToRiderListOfDriver: (driverId, newRiderId) => {
    const driver_id = {_id: driverId};
    User.updateOne(driver_id, {$push: {"driver_route.riders": newRiderId}})
      .then (() => console.log('Successfully added rider id to driver\'s rider list '))
      .catch((err) => {
        console.log('Error adding rider id to driver\'s rider list: ', err)})
  },

  removeIdOffRiderListOfDriver: (driverId, riderId) => {
    const driver_id = {_id: driverId};
    User.updateOne(driver_id, {$pull: {"driver_route.riders": riderId}})
      .then (() => console.log('Successfully removed rider id off driver\'s rider list '))
      .catch((err) => {
        console.log('Error removing rider id off driver\'s rider list: ', err)})
  }
}