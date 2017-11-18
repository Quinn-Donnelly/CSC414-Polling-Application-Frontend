// import { take, call, put, select } from 'redux-saga/effects';
// import { LOCATION_CHANGE } from 'react-router';
// import { GET_CLASSES } from './constants';

/*
export function* fetchClasses() {

}*/

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  // const watcher = yield takeEvery(GET_CLASSES, fetchClasses);

}

// All sagas to be loaded
export default [
  defaultSaga,
];
