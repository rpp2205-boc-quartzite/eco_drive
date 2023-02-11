const User = require('../models/user.js').User;

module.exports = {
  getRiderArray: (userId) => {

    const getRiderProfile = async function(riderID) {
      return await User.find({_id: riderID.rider_id})
        .then((rider) => {
          const container = {
            riderID: riderID,
            profile: rider[0]
          }
          return container;
        })
    }

    const filter = {_id: userId};
    return User.find(filter)
      .then((driver) => {
        return driver[0].driver_route.riders;
      })
      .then((riderArray) => {
        const riderProfiles = [];
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
      default: newRoute.default,
      distance: newRoute.distance,
      riders: newRoute.riders

    }
    return User.find(id)
    .then((userData) => {
      if (userData[0].driver_route.start_address === undefined) {
       return User.findOneAndUpdate(id, {driver_route: update})
       .then((result) => {
         console.log(result);
         return result;
       })
      .catch(err => console.log('Error updating record'));
      } else {
        console.log('User Route is Already Engaged');
        return;
      }
    })

  },

 removeRiderFromRiderArray: (driverId, riderId) => {
    const driver_id = {_id: driverId};
    return User.find(driver_id)
    .then((driver) => {
      return driver[0].driver_route.riders;
    })
    .then((ridersArray) => {
      var newRidersArray = [];
      for (var i = 0; i < ridersArray.length; i++) {
        if (JSON.stringify(ridersArray[i].rider_id) !== `"${riderId}"`) {
          newRidersArray.push(ridersArray[i]);
        }
      }
      return newRidersArray;
    })
    .then((newRidersArray) => {
      return User.findOneAndUpdate(driver_id, { $set: {"driver_route.riders": newRidersArray}});
    })
      .then ((newRidersArray) => {
        console.log('Successfully removed rider id off driver\'s rider list ')
        return newRidersArray
      })
      .catch((err) => {
        console.log('Error removing rider id off driver\'s rider list: ', err)
      })
  }
};

