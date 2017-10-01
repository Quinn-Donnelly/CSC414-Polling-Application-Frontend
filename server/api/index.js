const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const router = express.Router();

// Enable the cookie parser for auth
router.use(cookieParser());

/**
 *  This is the middleware for the api it will be used to do authentication
 */
router.use((req, res, next) => {
  next();
});

/**
 * Logger to log the API calls coming into the server
 */
router.use(morgan('combined'));

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
router.use('/classroom', require('./classroom'));
router.use('/test', require('./test'));

module.exports = router;
