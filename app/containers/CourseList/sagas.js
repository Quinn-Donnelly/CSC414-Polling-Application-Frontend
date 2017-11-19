import { take, call, put, select, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { GET_CLASSES, ADD_CLASS } from './constants';
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

  const filter = JSON.stringify({ where: { teacherId: userId } });
  const requestURL = `${API_URL}/classrooms?filter=${filter}&access_token=${accessToken}`;

  try {
    // Call our request helper (see 'utils/request')
    const classData = yield call(request, requestURL, options);
    yield put(classesLoaded(classData));
  } catch (err) {
    console.log(err);
  }
}

export function* postNewClass(action) {
  const accessToken = yield select(selectToken());
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: action.payload.name,
      secure: action.payload.secure,
    }),
  };

  const requestURL = `${API_URL}/classrooms?access_token=${accessToken}`;

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    yield call(fetchClasses);
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const watcherFetch = yield takeLatest(GET_CLASSES, fetchClasses);
  const watcherPost = yield takeEvery(ADD_CLASS, postNewClass);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherFetch);
  yield cancel(watcherPost);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
