const User = require('../models/user.js').User;

module.exports = {
  getRiderArray: () => {
    return User.find({"rider_route.started": {$exists: true}})
      .then((riders) => {
        return riders;
      })
      .catch(err => {
        console.log('Error While Getting Riders: ', err)
        throw err;
      })
  },
};