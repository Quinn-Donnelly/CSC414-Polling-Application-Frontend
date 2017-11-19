import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import {
  LOG_IN,
  LOG_OUT,
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
    yield call(storeLogin, loginInfo);
    yield put(push('/home'));
  } catch (err) {
    console.log(err);
  }
}

export function* exit() {
  yield call(deleteCookie);
  yield put(push('/login'));
}

function deleteCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const c = cookies[i];
    const eqPos = c.indexOf('=');
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

function storeLogin(loginData) {
  const date = new Date();
  date.setTime(date.getTime() + (loginData.ttl * 24 * 60 * 60 * 1000));
  document.cookie = `userId=${loginData.userId}; path=/; domain=localhost; Expires=${date.toUTCString()};`;
  document.cookie = `id=${loginData.id}; path=/; domain=localhost; Expires=${date.toUTCString()};`;
}

// Individual exports for testing
export function* watcher() {
  const loginWatcher = yield takeLatest(LOG_IN, login);
  const logoutWatcher = yield takeEvery(LOG_OUT, exit);

  yield take(LOCATION_CHANGE);
  yield cancel(loginWatcher);
  yield cancel(logoutWatcher);
}

// All sagas to be loaded
export default [
  watcher,
];
