const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Goodbye Cruel World');
});

module.exports = router;