/* eslint-disable */
const logger = require('../../logger');
const MongoClient = require('mongodb').MongoClient;

var DB = null;

const url = 'mongodb://localhost:27017/poller';

module.exports = function(cb) {
  if(DB){
    return cb(null, DB);
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      logger.error(`${err}`);
      return cb(err, null);
    } else {
      logger.log(`Connected to database at ${url}`);
      DB = db;
      return cb(null, DB);
    }
  });
}
