const express = require('express');
const router = express.Router();

router.get('/goodbye', (req, res) => {
  res.send('Goodbye Cruel World');
});

module.exports = router;