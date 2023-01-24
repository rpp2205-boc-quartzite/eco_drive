const User = require('../models/user');

module.exports = {

  addExampleUser: async (req, res) => {

    console.log('called');

    const user = new User({
      full_name: 'cam the man',
      email: 'camjhirsh@gmail.com'

    });

    await user.save();
    console.log('saved new user');
    res.sendStatus(200);
  }

};
