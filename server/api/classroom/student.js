/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const logger = require('../../logger');
const bcrypt = require('bcrypt');
const getUser = require('../util').getUser;
const getDB = require('../database');
let db = getDB((err, database) => {
  if (err) {
    logger.error(`Unable to connect to database in user: ${err}`);
    process.exit(1);
  }

  db = database;
});

const ENDPOINT = require('./constants').ENDPOINT;
const COLLECTION_NAME = require('./constants').COLLECTION_NAME;

function* addStudent(req, res) {
  let user = null;
  try {
    user = yield getUser(req.cookies.login.id);
  } catch (err) {
    logger.error(`Unable to query user at ${ENDPOINT} delete: ${err}`);
    res.sendStatus(500);
    return;
  }

  const collection = db.collection(COLLECTION_NAME);
  let classroom = null;
  try {
    classroom = yield collection.findOne({ shortId: req.params.classroomId });
    if (classroom === null) {
      res.status(404).json({ err: 'Classroom not found' });
      return;
    }
  } catch (err) {
    logger.error(`Unable to query classroom at ${ENDPOINT}/id/student post: ${err}`);
    res.sendStatus(500);
    return;
  }

  if (user._id.equals(classroom.teacher.valueOf())) {
    res.status(403).json({ err: 'Teachers are not allowed to be students of their own class' });
    return;
  }


  if (classroom.private.is) {
    if (!req.body.pwd || typeof (req.body.pwd) !== 'string') {
      res.status(400).json({ err: 'pwd is required on private classrooms' });
      return;
    }

    // Whether the pwd is correct
    const correct = yield bcrypt.compare(req.body.pwd, classroom.private.pwd);
    if (!correct) {
      res.status(401).json({ err: 'Password incorrect' });
      return;
    }
  }

  try {
    const isInClass = classroom.students.find((elm) => {
      if (user._id.equals(elm)) {
        return true;
      }

      return false;
    });
    if (isInClass !== undefined) {
      res.status(409).json({ err: 'Studnet already in class' });
      return;
    }

    collection.updateOne({ shortId: req.params.classroomId }, {
      $push: { students: user._id },
    });
  } catch (err) {
    logger.error(`Unable to add studnet to classroom at ${ENDPOINT}/id/student post: ${err}`);
    res.sendStatus(500);
    return;
  }

  res.status(201).json({ message: 'Student added to classroom' });
}

module.exports = {
  addStudent,
};
