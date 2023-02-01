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

  postRiderRoute: (newRoute) => {
    const id = {_id: newRoute.id}
    const update = {
      start_address: newRoute.start_address,
      start_lat: newRoute.start_lat,
      start_lng: newRoute.start_lng,
      end_address: newRoute.end_address,
      end_lat: newRoute.end_lat,
      end_lng: newRoute.end_lng,
      time: newRoute.time,
      default: newRoute.default
    }
      return User.findOneAndUpdate(id, {rider_route: update}).then((result) => console.log('Updated user record with new route')).catch(err => console.log('Error updating record'));
  },

  postDriverLicense: (data) => {
    const id = {_id: data._id}
    const update = {
      drivers_license: data.drivers_license,
      license_plate: data.license_plate
    }
    return User.findOneAndUpdate(id, update).then((result) => console.log('Updated user record with license info')).catch(err => console.log('Error updating user record'));
  }
}