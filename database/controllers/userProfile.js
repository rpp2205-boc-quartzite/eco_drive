const User = require('../models/user.js').User;

module.exports = {
  getUserInfo: (user) => {
    console.log('ID in controllers', user)
    let id = {_id: user};
    return User.find(id).then((user) => {return user}).catch(err => console.log(err))
  },

  updateDriverProfile: (updatedInfo) => {
    const id = {_id: updatedInfo.userId}
    // const update = {
    //   full_name: updatedInfo.full_name,
    //   email: updatedInfo.email,
    //   drivers_license: updatedInfo.drivers_license
    // }
    return User.findByIdAndUpdate(id, {"full_name": updatedInfo.full_name, "email": updatedInfo.email, "drivers_license": updatedInfo.drivers_license})
    .then((result) => console.log('SUCCESS updating driver user profile', result))
    .catch(err => console.log('ERR updating driver user profile', err));
  },

  updateRiderProfile: (updatedRider) => {
    const id = {_id: updatedRider.userId}
    return User.findByIdAndUpdate(id, {"full_name": updatedRider.full_name, "email": updatedRider.email})
    .then((result) => console.log('SUCCESS updating rider user profile', result))
    .catch(err => console.log('ERR updating rider user profile', err));
  }
}