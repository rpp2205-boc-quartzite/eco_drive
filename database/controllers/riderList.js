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

  addDriversRoute: (newRoute) => {
    console.log('addDriversRoute: ', newRoute)
    const id = {_id: newRoute.id}
    const update = {
      start_address: newRoute.start_address,
      start_lat: newRoute.start_lat,
      start_lng: newRoute.start_lng,
      end_address: newRoute.end_address,
      end_lat: newRoute.end_lat,
      end_lng: newRoute.end_lng,
      time: newRoute.time,
      total_seats: newRoute.total_seats,
      started: newRoute.started,
      default: newRoute.default
    }
    return User.findOneAndUpdate(id, {driver_route: update})
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(err => console.log('Error updating record'));
  },


};