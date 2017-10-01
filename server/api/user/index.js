const express = require('express');
const crypto = require('crypto');
const co = require('co');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const shortid = require('shortid');
const logger = require('../../logger');
const router = express.Router();
const standardizeEmail = require('../util').standardizeEmail;
const standardizeName = require('util').standardizeName;
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
const APP_SECRET = 'THIS IS SO SECRUE';
const ALG = 'aes192';

// '/' Route
/**
 * This will log the given user in
 * @param {string} email User name for the user logging in
 * @param {string} pwd The password for the user attempting login
 * @return {response} If succsess (200) a json will return with the msg "Logged In" and a login cookie
 * The cookie will hold the ID for the user and a token for security login
 * Otherwise an apropriate status code with a err key in the json holding an error message
 */
router.get('/', co.wrap(function* login(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  // Check params
  if (typeof (req.query.email) !== 'string') {
    res.status(400).json({ err: 'email is required and must be a string' });
    return;
  }

  // TODO: the password is being sent in plain text need to encrypt
  if (typeof (req.query.pwd) !== 'string') {
    res.status(400).json({ err: 'pwd is required and must be a string' });
    return;
  }

  // Sanatize the user name and conform it to the data model
  const email = standardizeEmail(req.query.email);

  // User from the database with matching name
  let user = null;

  try {
    user = yield collection.findOne({ email });
  } catch (err) {
    logger.error(`Unable to check for user in ${ENDPOINT} get: ${err}`);
    res.sendStatus(500);
    return;
  }

  // Whether the pwd is correct
  const correct = yield bcrypt.compare(req.query.pwd, user.pwd);

  if (correct) {
    const cipher = crypto.createCipher(ALG, APP_SECRET);
    const userUUID = uuidv4();
    let token = cipher.update(userUUID, 'utf8', 'hex');
    token += cipher.final('hex');

    let result = null;
    try {
      // Add the UUID to database for validating the cookie
      result = yield collection.update({ email }, { $set: { token: userUUID } });
      if (result.result.nModified !== 1) {
        throw new Error('No change to document on update');
      }
    } catch (err) {
      logger.error(`Unable to add token for user in ${ENDPOINT} get: ${err}`);
      res.status(500);
      return;
    }

    res.status(200).cookie(LOGIN_COOKIE_NAME, { id: user.shortId, token }, { maxAge: COOKIE_LIFETIME_IN_HOURS * MILI_SECONDS_IN_HOUR }).json({ message: 'Logged In' });
    return;
  }

  res.status(401).json({ err: 'Incorrect username password combination' });
}));

/**
 * This will add a new user to the database
 * @param {string} name The display name for the user
 * @param {string} email The login name for the user will be the email (Must be unique)
 * @param {string} pwd The password for the new user
 * @param
 */
router.post('/', co.wrap(function* addUser(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  // Check params
  if (typeof (req.body.name) !== 'string') {
    res.status(400).json({ err: 'name is required and must be a string' });
    return;
  }

  if (typeof (req.body.email) !== 'string') {
    res.status(400).json({ err: 'email is required and must be a string' });
    return;
  }

  // Remove leading and trailing spaces from the name
  // Conform and sanitize the user name
  const email = standardizeEmail(req.body.email);
  const displayName = standardizeName(req.body.name);

  if (displayName === '') {
    res.status(400).json({ err: 'Bad username. Must be at least length one without speacil charecters' });
    return;
  }

  if (typeof (req.body.pwd) !== 'string' || req.body.pwd === '') {
    res.status(400).json({ err: 'pwd is required and must be a string' });
    return;
  }

  // Used to store a user to check if username is taken
  let user = null;

  try {
    user = yield collection.findOne({ email });
  } catch (err) {
    logger.error(`Unable to check for user in ${ENDPOINT} post`);
    res.sendStatus(500);
    return;
  }

  // If the username is taken respond with conflict
  if (user !== null) {
    res.status(409).json({ err: `user ${email} already exists` });
    return;
  }

  // Generate hash for storing the user's password
  const hash = yield bcrypt.hash(req.body.pwd, SALT_ROUNDS);

  // Generate short id for the use of URLs this will identify the user instead of mongo id
  const shortId = shortid.generate();

  // Preform the insert to add the user and users data to the database
  let result = null;
  try {
    result = yield collection.insertOne({ shortId, email, displayName, pwd: hash });
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
