const express = require('express');
const crypto = require('crypto');
const co = require('co');
const logger = require('../../logger');
const getDB = require('../database');
let db = getDB((err, database) => {
  if (err) {
    logger.error(`Unable to connect to database in user: ${err}`);
    process.exit(1);
  }

  db = database;
});

const router = express.Router();

const ENDPOINT = '/test';
const USER_COLLECTION = 'user';
const APP_SECRET = 'THIS IS SO SECRUE';
const ALG = 'aes192';


router.use(co.wrap(function* auth(req, res, next) {
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
}));

router.get('/', (req, res) => {
  res.status(200).json({ message: 'you are so authenticated right now' });
});

module.exports = router;
