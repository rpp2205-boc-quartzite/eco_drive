const User = require('../models/user.js').User;

module.exports = {
  postReviewHandler: async (object) => {
    try {
      return await User.findOneAndUpdate({_id: object.userid}, {$push: {"rider_reviews": object}})
    } catch (error) {
      // Rejection caught
      console.error(error);
    }
  }
}

// (async function updateOne() {
//   await Product.findOneAndUpdate({_id: styleId_to_prodId[data['styleId']], "results": { $elemMatch: { "_id": data['styleId'] } }}, {$pull: {"results.$.photos": {thumbnail_url: null}}})
// })(){ $push: { "attachments": arr[0] } }

// async function divideWithAwait() {
//   try {
//     return await promisedDivision(5, 0);
//   } catch (error) {
//     // Rejection caught
//     console.log(error); // logs Error('Cannot divide by 0')
//   }
// }