import { take, call, takeEvery, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import {
  JOIN_CLASS,
} from './constants';

export function* join(action) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shortid: action.shortid,
    }),
  };

  const requestURL = `${API_URL}/classrooms/shortid`;
  try {
    // Call our request helper (see 'utils/request')
    const classroomId = yield call(request, requestURL, options);
    yield put(push(`/questionpage/${classroomId.classroomId}`));
  } catch (err) {
    console.error(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const joinClassWatcher = yield takeEvery(JOIN_CLASS, join);

  yield take(LOCATION_CHANGE);
  yield cancel(joinClassWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
