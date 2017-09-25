const express = require('express');
const co = require('co');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const logger = require('../../logger');
const router = express.Router();
const getDB = require('../database');
let db = getDB((err, database) => {
  if (err) {
    logger.error(`Unable to connect to database in user: ${err}`);
    process.exit(1);
  }

  db = database;
});

const COLLECTION_NAME = 'user';
const ENDPOINT = '/user';
const SALT_ROUNDS = 10;
const LOGIN_COOKIE_NAME = 'login';
const COOKIE_LIFETIME_IN_HOURS = 1;
const MILI_SECONDS_IN_HOUR = 3600000;

/**
 * Given a string this will remove specail chars and trim white space and to upper it
 * @param  {string} name The string to be standardized
 * @return {string}      The standardized name
 */
function standardizeName(name) {
  let username = name.replace(/[^a-zA-Z 0-9]/g, '');
  username = username.trim();
  username = username.toUpperCase();

  return username;
}

// '/' Route
router.get('/', co.wrap(function* login(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  // Check params
  if (typeof (req.query.name) !== 'string') {
    res.status(400).json({ message: 'name is required and must be a string' });
    return;
  }

  // TODO: the password is being sent in plain text need to encrypt
  if (typeof (req.query.pwd) !== 'string') {
    res.status(400).json({ message: 'pwd is required and must be a string' });
    return;
  }

  // Sanatize the user name and conform it to the data model
  const username = standardizeName(req.query.name);

  // User from the database with matching name
  let user = null;

  try {
    user = yield collection.findOne({ name: username });
  } catch (err) {
    logger.error(`Unable to check for user in ${ENDPOINT} get`);
    res.sendStatus(500);
    return;
  }

  // Whether the pwd is correct
  const correct = yield bcrypt.compare(req.query.pwd, user.pwd);

  if (correct) {
    res.cookie(LOGIN_COOKIE_NAME, user.shortId, { maxAge: COOKIE_LIFETIME_IN_HOURS * MILI_SECONDS_IN_HOUR }).json({ message: 'Logged In' });
    return;
  }

  res.status(401).json({ message: 'Incorrect username password combination' });
}));


router.post('/', co.wrap(function* addUser(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  // Check params
  if (typeof (req.body.name) !== 'string') {
    res.status(400).json({ message: 'name is required and must be a string' });
    return;
  }
  // Remove leading and trailing spaces from the name
  // Conform and sanitize the user name
  const username = standardizeName(req.body.name);

  if (username === '') {
    res.status(400).json({ message: 'Bad username. Must be at least length one without speacil charecters' });
    return;
  }

  if (typeof (req.body.pwd) !== 'string' || req.body.pwd === '') {
    res.status(400).json({ message: 'pwd is required and must be a string' });
    return;
  }

  // Make role name consistant
  if (typeof (req.body.role) !== 'string') {
    res.status(400).json({ message: 'role is required and must be a string' });
    return;
  }

  const role = req.body.role.toUpperCase();
  if (!(role === 'STUDENT' || role === 'TEACHER')) {
    res.status(400).json({ message: 'Invalid role' });
    return;
  }

  // Used to store a user to check if username is taken
  let user = null;

  try {
    user = yield collection.findOne({ name: username });
  } catch (err) {
    logger.error(`Unable to check for user in ${ENDPOINT} post`);
    res.sendStatus(500);
    return;
  }

  // If the username is taken respond with conflict
  if (user !== null) {
    res.status(409).json({ message: `user ${username} already exists` });
    return;
  }

  // Generate hash for storing the user's password
  const hash = yield bcrypt.hash(req.body.pwd, SALT_ROUNDS);

  // Generate short id for the use of URLs this will identify the user instead of mongo id
  const shortId = shortid.generate();

  // Preform the insert to add the user and users data to the database
  let result = null;
  try {
    result = yield collection.insertOne({ shortId, name: username, pwd: hash, role });
  } catch (err) {
    logger.error(`Unable to add user at ${ENDPOINT} post: ${err}`);
    res.sendStatus(500);
    return;
  }

  if (result.insertedCount !== 1) {
    logger.error(`Unable to add user at ${ENDPOINT} post`);
    res.sendStatus(500);
    return;
  }

  res.status(201).json({ message: 'New user added', id: shortId });
}));

module.exports = router;
