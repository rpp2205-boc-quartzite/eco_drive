const User = require('../models/user.js').User;

module.exports = {
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
  }
}