import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import {
  LOG_IN,
} from './constants';
import { loggedIn } from './actions';

export function* login(action) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: action.email,
      password: action.pwd,
    }),
  };

  const requestURL = `${API_URL}/clients/login`;

  try {
    // Call our request helper (see 'utils/request')
    const loginInfo = yield call(request, requestURL, options);
    yield put(loggedIn(loginInfo));
    yield put(push('/home'));
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export function* watcher() {
  const loginWatcher = yield takeLatest(LOG_IN, login);

  yield take(LOCATION_CHANGE);
  yield cancel(loginWatcher);
}

// All sagas to be loaded
export default [
  watcher,
];
