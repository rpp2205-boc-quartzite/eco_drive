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