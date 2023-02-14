const User = require('../models/user.js').User;

module.exports = {
  postReviewHandler: (review) => {
    if (review.view === 'driver') {
      return User.findOneAndUpdate({_id: review.revieweeId}, {$push: {"rider_reviews": review}}, {new: true})
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error)
      })
    } else {
      return User.findOneAndUpdate({_id: review.revieweeId}, {$push: {"driver_reviews": review}}, {new: true})
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error)
      })
    }
  }
}