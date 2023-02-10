const User = require('../models/user.js').User;

module.exports = {
  postReportHandler: (report) => {
    console.log('report: ', report);
    return User.findOneAndUpdate({_id: report.user_id}, {$push: {"reported": report}}, {new: true})
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error)
    })
  }
}