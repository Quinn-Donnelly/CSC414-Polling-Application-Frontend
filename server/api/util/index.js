const crypto = require('crypto');
const logger = require('../../logger');
const getDB = require('../database');
let db = getDB((err, database) => {
  if (err) {
    logger.error(`Unable to connect to database in user: ${err}`);
    process.exit(1);
  }

  db = database;
});

const ENDPOINT = '/util';
const USER_COLLECTION = 'user';
const APP_SECRET = 'THIS IS SO SECRUE';
const ALG = 'aes192';

/**
 * Given a string this will remove specail chars and trim white space and to upper it
 * @param  {string} name The string to be standardized
 * @return {string}      The standardized name
 */
function standardizeEmail(name) {
  let username = name.replace(/[^a-zA-Z 0-9@.]/g, '');
  username = username.trim();
  username = username.toUpperCase();

  return username;
}

/**
 * Given a string this will remove specail chars (only allowed letters(cap and lower),
 * spaces, digits, dash, and underscore ) and trim white space. Will ensure that
 * each word is uppercase
 * @param  {string} name The string to be standardized
 * @return {string}      The standardized name
 */
function standardizeName(name) {
  let username = name.replace(/[^a-zA-Z 0-9_-]/g, '');
  username = username.trim();
  const words = username.split(' ');
  let standardName = '';
  for (let i = 0; i < words.length; i += 1) {
    standardName += `${words[i][0].toUpperCase() + words[i].slice(1)} `;
  }

  return standardName;
}

/**
 * Gets a user from the database
 * @param  {string}    shortId The shortId of the user to return
 * @return {Generator}         The user object
 */
function* getUser(shortId) {
  const collection = db.collection(USER_COLLECTION);
  let user = null;

  try {
    user = yield collection.findOne({ shortId });
  } catch (err) {
    return new Error(err);
  }
  return user;
}


function* auth(req, res, next) {
  let loginCookie = null;
  let shortId = null;
  let encryptedToken = null;

  try {
    loginCookie = req.cookies.login;
    shortId = loginCookie.id;
    encryptedToken = loginCookie.token;
  } catch (err) {
    res.sendStatus(401);
    return;
  }

  const collection = db.collection(USER_COLLECTION);

  let user = null;
  try {
    user = yield collection.findOne({ shortId });
  } catch (err) {
    logger.error(`Unable to search for user in ${ENDPOINT} get: ${err}`);
    res.sendStatus(500);
    return;
  }

  const decipher = crypto.createDecipher(ALG, APP_SECRET);
  let token = decipher.update(encryptedToken, 'hex', 'utf8');
  token += decipher.final('utf8');

  if (token === user.token) {
    next();
    return;
  }

  res.sendStatus(401);
}

module.exports = { auth, standardizeEmail, standardizeName, getUser };
