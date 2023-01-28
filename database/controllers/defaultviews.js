const User = require('../models/user.js').User;

module.exports = {
  getDriverView: (user) => {
    console.log('ID', user)
    let id = {_id: user};
    return User.find(id).then((user) => {return user}).catch(err => console.log(err))
  },

  getRiderView: (user) => {
    console.log('ID', user)
    let id = {_id: user};
    return User.find(id).then((user) => {return user}).catch(err => console.log(err))
  },
}