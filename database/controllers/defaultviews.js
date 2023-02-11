const User = require('../models/user.js').User;

module.exports = {
  getDriverView: (user) => {
    let id = {_id: user};
    return User.find(id).populate('driver_route.riders.rider_id').then((user) => {return user}).catch(err => console.log(err))
  },

  getRiderView: (user) => {
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
      await module.exports.addIdToRiderListOfDriver(newRoute.driver_id, newRoute._id, newRoute.start_distance, newRoute.end_distance)
      console.log('Updated user record with new rider route');
    } catch (err) {
      console.log('Error updating rider route: ', err);
    }
  },

  postDriverLicense: (data) => {
    const id = {_id: data._id}
    const update = {
      drivers_license: data.drivers_license,
      license_plate: data.license_plate
    }
    return User.findOneAndUpdate(id, update).then((result) => console.log('Updated user record with license info')).catch(err => console.log('Error updating user record'));
  },

  addIdToRiderListOfDriver: async (driverId, newRiderId, startDistance, endDistance) => {
    const driver_id = {_id: driverId};
    const rider = {
      rider_id: newRiderId,
      starting_distance: startDistance,
      end_distance: endDistance
    }
    try {
      const driver = await User.findOne(driver_id)
      if (!driver.driver_route.riders.includes(newRiderId)) {
        await User.updateOne(driver_id, {$push: {"driver_route.riders": rider}})
        console.log('Successfully added rider id to driver\'s rider list ')
      } else {
        console.log('This rider is already in the list')
      }
    } catch(err) {
      console.log('Error adding rider id to driver\'s rider list: ', err)
    }
  },

  removeIdOffRiderListOfDriver: (driverId, riderId) => {
    const driver_id = {_id: driverId};
    User.updateOne(driver_id, {$pull: {driver_route: {rider_id: riderId}}})
      .then (() => console.log('Successfully removed rider id off driver\'s rider list '))
      .catch((err) => {
        console.log('Error removing rider id off driver\'s rider list: ', err)})
  },

  postDefaultRiderRoute: (route) => {
    console.log(route)
    const id = {_id: route._id};
    const update = {
      start_address: route.start_address,
      end_address: route.end_address,
      start_lat: route.start_lat,
      start_lng: route.start_lng,
      end_lat: route.end_lat,
      end_lng: route.end_lng,
      time: route.time,
      default: true
    }
    return User.findOneAndUpdate(id, {default_rider_route: update})
    .then((result) => console.log('Updated user record with new default rider route'))
    .catch(err => console.log('Error updating user record'));
  },

  postDefaultDriverRoute: (route) => {
    console.log(route)
    const id = {_id: route.id};
    const update = {
      start_address: route.start_address,
      end_address: route.end_address,
      start_lat: route.start_lat,
      start_lng: route.start_lng,
      end_lat: route.end_lat,
      end_lng: route.end_lng,
      time: route.time,
      total_seats: route.total_seats,
      default: true
    }
    return User.findOneAndUpdate(id, {default_driver_route: update})
    .then((result) => console.log('Updated user record with new default driver route'))
    .catch(err => console.log('Error updating user record'));
  }
}