import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { GET_CLASSES } from './constants';
import { API_URL } from '../App/constants';
import { selectUserId, selectToken } from '../Login/selectors';
import { classesLoaded } from './actions';

export function* fetchClasses() {
  const userId = yield select(selectUserId());
  const accessToken = yield select(selectToken());
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const filter = JSON.stringify({ teacherId: userId });
  const requestURL = `${API_URL}/classrooms?filter=${filter}&access_token=${accessToken}`;

  try {
    // Call our request helper (see 'utils/request')
    const classData = yield call(request, requestURL, options);
    yield put(classesLoaded(classData));
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(GET_CLASSES, fetchClasses);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
