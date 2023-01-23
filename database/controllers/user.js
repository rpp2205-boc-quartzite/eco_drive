const User = require('../models/user.js');

module.exports = {

  addExampleUser: async (req, res) => {

    let user = new User({

      full_name: 'cam the man',
      email: 'camjhirsh@gmail.com'

    });

    await user.save();

    res.sendStatus(200);
  }

};
