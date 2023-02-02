const User = require('../models/user.js').User;

module.exports = {
  postReportHandler: (object) => {
    console.log('object', object);
    return User.findOneAndUpdate({_id: object.user_id}, {$push: {"reported": object}}, {new: true})
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error)
    })
  }
}