const User = require('../models/user.js').User;

module.exports = {
  getDriverList: () => {
    return User.find({is_driver: true, "driver_route.started": {$exists: true}})
      .then((drivers) => {
        return drivers;
      })
      .catch(err => {
        console.log('Get drivers error: ', err)
        throw err;
      })
  },

  addFavorite: (userId, driverId) => {

  },

  removeFavorite: (userId, driverId) => {

  }
}