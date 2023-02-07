const User = require('../models/user.js').User;

module.exports = {
  getRiderArray: (userId) => {

    const getRiderProfile = async function(riderID) {
      // console.log('RIDER ID: ', riderID.rider_id)
      return await User.find({_id: riderID.rider_id})
        .then((rider) => {
          const container = {
            riderID: riderID,
            profile: rider[0]
          }

          // console.log('CONTAINER: ', container)
          return container;
        })
    }

    const filter = {_id: userId};
    return User.find(filter)
      .then((driver) => {
        // console.log('RIDER ARRAY: ', driver[0].driver_route.riders)
        return driver[0].driver_route.riders;
      })
      .then((riderArray) => {
        const riderProfiles = [];
        console.log(riderArray);
        for (var i = 0; i < riderArray.length; i++) {
          var profile = getRiderProfile(riderArray[i])
          riderProfiles.push(profile);
        }
        return riderProfiles;
      })
      .catch(err => {
        console.log('Error While Getting Riders: ', err)
        throw err;
      })
  },

};