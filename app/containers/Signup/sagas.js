import { take, call, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import { SIGN_UP } from './constants';
import { login } from '../Login/sagas';

export function* signUpUser(action) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: action.username,
      email: action.email,
      password: action.password,
    }),
  };

  const requestURL = `${API_URL}/clients`;

  try {
    const res = yield call(request, requestURL, options);
    console.log(res);
    yield call(login, { email: action.email, pwd: action.password });
  } catch (err) {
    console.log(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  const watcher = yield takeLatest(SIGN_UP, signUpUser);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
