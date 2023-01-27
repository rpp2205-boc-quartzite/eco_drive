const User = require('../models/user.js').User;

module.exports = {
  getDriverList: () => {
    return User.find({is_driver: true}, {driver_route: 1})
      .then((drivers) => {
        return drivers;
      })
      .catch(err =>
        console.log('Get drivers error: ', err)
      )
  }
}