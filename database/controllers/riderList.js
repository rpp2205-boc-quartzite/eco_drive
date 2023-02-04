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

  updateCurrentDriverRoute: (currentRoute, acceptedRiders) => {
    const id = {_id: currentRoute.userId}
    const update = {
      started: false,
      start_address: currentRoute.start_address,
      start_lat: currentRoute.start_lat,
      start_lng: currentRoute.start_lng,
      end_address: currentRoute.end_address,
      end_lat: currentRoute.end_lat,
      end_lng: currentRoute.end_lng,
      time: currentRoute.time,
      total_seats: currentRoute.total_seats,
      default: currentRoute.default,
      riders: acceptedRiders
    };

    return User.findOneAndUpdate(id, {driver_route: update })
      .then((result) => {
        console.log('Current Driver Route Added!')
      })
      .catch((err) => {
        console.log('Error updating record', err)
      });
  },

  updateAllRiderRoutes: async (idArray, driverData) => {
    const updateCurrentRiderRoute = async (currentRoute) => {
      const user_id = {_id: currentRoute._id}
      const update = {
        started: false,
        start_address: currentRoute.start_address,
        start_lat: currentRoute.start_lat,
        start_lng: currentRoute.start_lng,
        end_address: currentRoute.end_address,
        end_lat: currentRoute.end_lat,
        end_lng: currentRoute.end_lng,
        time: currentRoute.time,
        default: currentRoute.default,
        driver_id: currentRoute.driver_id
      }

      return User.findOneAndUpdate(user_id, {rider_route: update})
        .then((result) => {
          console.log('Accepted Rider Route Added');
        })
        .catch ((err) => {
          console.log('Error updating rider route: ', err);
        })
    }
    var promiseArray = [];
    for (var i = 0; i < idArray.length; i++) {
      const update = {
        _id: idArray[i],
        start_address: driverData.start_address,
        start_lat: driverData.start_lat,
        start_lng: driverData.start_lng,
        end_address: driverData.end_address,
        end_lat: driverData.end_lat,
        end_lng: driverData.end_lng,
        time: driverData.time,
        default: driverData.default,
        driver_id: driverData._id
      }

      promiseArray.push(updateCurrentRiderRoute(update))
    }

    return Promise.all(promiseArray);
  }
};