const express = require('express');
const logger = require('../logger');

const router = express.Router();

/**
 *  This is the middleware for the api it will be used to do authentication
 *  and logging of requests
 */
router.use((req, res, next) => {
  logger.log('API call coming');
  next();
});

/**
 * Home route returns the welcome message
 */
// TODO: Add the link to the docs to the welcome message
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the poller API. Please read the docs before use' });
});

/**
 *  API Endpoints are defined here
 */
router.use('/user', require('./user'));

module.exports = router;
