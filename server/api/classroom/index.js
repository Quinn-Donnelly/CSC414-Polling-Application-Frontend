/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const express = require('express');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');  // Timestamp based
const co = require('co');
const auth = require('../util').auth;
const logger = require('../../logger');
const standardizeName = require('../util').standardizeName;
const getUser = require('../util').getUser;
const getDB = require('../database');
let db = getDB((err, database) => {
  if (err) {
    logger.error(`Unable to connect to database in user: ${err}`);
    process.exit(1);
  }

  db = database;
});


const router = express.Router();

const COLLECTION_NAME = 'classroom';
const ENDPOINT = '/classroom';
const SALT_ROUNDS = require('../constants').SALT_ROUNDS;

router.use(co.wrap(auth));

/**
 * Returns all active classrooms with their displayNames and shortIds along with
 * if they are secure
 */
// TODO: Need to limit the number of classrooms that are sent to client
router.get('/', co.wrap(function* getClassrooms(req, res) {
  const collection = db.collection(COLLECTION_NAME);

  let docs = null;
  try {
    docs = yield collection.find({ active: true }, { shortId: 1, displayName: 1, 'secure.is': 1, _id: 0 }).toArray();
  } catch (err) {
    logger.error(`Unable to query classroom at ${ENDPOINT} get: ${err}`);
    res.sendStatus(500);
  }
  res.status(200).json(docs);
}));

/**
 * Creates a classroom for the user, the user is the teacher
 * @param {string} name This is the display name for the classroom
 * @param {number} private If true then the pwd param is required and will become
 * the password for joining the classroom
 * @param {string} [pwd] The password for a private class
 */
router.post('/', co.wrap(function* addClassroom(req, res) {
  // Check params
  if (typeof (req.body.name) !== 'string') {
    res.status(400).json({ err: 'name is required and must be a string' });
    return;
  }


  let secure = false;
  try {
    secure = parseInt(req.body.secure, 10);
  } catch (err) {
    res.status(400).json({ err: 'secure is required and must be a number' });
    return;
  }

  if (secure) {
    if (typeof (req.body.pwd) !== 'string') {
      res.status(400).json({ err: 'pwd is required while secure and must be a string' });
      return;
    }
  }

  // Data for the classroom to be put into database
  const collection = db.collection(COLLECTION_NAME);
  const displayName = standardizeName(req.body.name);
  const shortId = shortid.generate();
  const classroomUUID = uuid();

  let teacher = null;
  try {
    teacher = yield getUser(req.cookies.login.id);
    teacher = teacher._id;
  } catch (err) {
    logger.error(`Unable to check for user in ${ENDPOINT} get: ${err}`);
    res.sendStatus(500);
    return;
  }

  let hash = '';
  if (secure) {
    // Generate hash for storing the user's password
    hash = yield bcrypt.hash(req.body.pwd, SALT_ROUNDS);
  }
  // Preform the insert to add the user and users data to the database
  let result = null;
  try {
    result = yield collection.insertOne({
      shortId,
      displayName,
      teacher,
      students: [],
      questions: classroomUUID,
      active: true,
      secure: {
        is: secure,
        pwd: hash,
      },
    });
  } catch (err) {
    logger.error(`Unable to add classroom at ${ENDPOINT} post: ${err}`);
    res.sendStatus(500);
    return;
  }

  if (result.insertedCount !== 1) {
    logger.error(`Unable to add classroom at ${ENDPOINT} post`);
    res.sendStatus(500);
    return;
  }

  res.status(201).json({ message: 'New classroom added', id: shortId });
}));

module.exports = router;
