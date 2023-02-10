const User = require('../models/user.js').User;

module.exports = {
  getDriverList: (userId) => {
    const availableDriver = []
    return User.find({is_driver: true, "driver_route.started": false, "driver_route.start_address": {$exists: true}, _id: {$ne: userId}})
      .then((drivers) => {
        for (let driver of drivers) {
          if ((driver.driver_route.riders.length < driver.driver_route.total_seats) && (driver.reported.length < 5)) {
            availableDriver.push(driver)
          }
        }
        return availableDriver;
      })
      .catch(err => {
        console.log('Get drivers error: ', err)
        throw err;
      })
  },

  addFavorite: (userId, driverId) => {
    const filter = {_id: userId};
    return User.updateOne(filter, {$push: {favorites: driverId}})
      .then (() => console.log('Successfully favorite driver'))
      .catch((err) => {
        console.log('Error favorite driver: ', err)})
  },

  removeFavorite: (userId, driverId) => {
    const filter = {_id: userId};
    return User.updateOne(filter, {$pull: {favorites: driverId}})
      .then (() => console.log('Successfully unfavorite driver'))
      .catch((err) => {
        console.log('Error unfavorite driver: ', err)})
  }
}