const express = require('express');
const co = require('co');
const bcrypt = require('bcrypt');
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

// '/' Route
router.get('/', (req, res) => {
  logger.log('Hit the user API');
  res.json({ message: 'Welcome to the user API. Please read the docs before use.' });
});

router.post('/', co.wrap(function* addUser(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  // Check params
  if (typeof (req.body.name) !== 'string') {
    res.status(400).json({ message: 'name is required and must be a string' });
    return;
  }
  // Remove leading and trailing spaces from the name
  // Conform and sanitize the user name
  let username = req.body.name.replace(/[^a-zA-Z 0-9]/g, '');
  username = username.trim();
  username = username.toUpperCase();

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

  // Preform the insert to add the user and users data to the database
  let result = null;
  try {
    result = yield collection.insert({ name: username, pwd: hash, role });
  } catch (err) {
    logger.error(`Unable to add user at ${ENDPOINT} post: ${err}`);
    res.sendStatus(500);
  }

  res.status(201).json({ message: 'New user added', id: result.insertedIds[0] });
}));

module.exports = router;
