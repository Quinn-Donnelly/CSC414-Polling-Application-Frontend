const express = require('express');
const co = require('co');
const auth = require('../util').auth;

const router = express.Router();

router.use(co.wrap(auth));

router.get('/', (req, res) => {
  res.status(200).json({ message: 'you are so authenticated right now' });
});

module.exports = router;
