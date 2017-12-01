import { take, call, select, takeEvery, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import { makeSelectLocationState } from '../App/selectors';
import {
  POST_QUESTION,
} from './constants';

export function* postQuestion(action) {
  const routerState = yield select(makeSelectLocationState());
  const classroomId = routerState.locationBeforeTransitions.pathname.split('/')[2];

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'dumy',
      text: action.question,
      type: {
        name: 'multi',
        options: action.answers,
      },
      active: true,
      classroomId,
    }),
  };

  const requestURL = `${API_URL}/classrooms/${classroomId}/questions`;
  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    window.alert('Question Posted');
  } catch (err) {
    console.error(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const questionPost = yield takeEvery(POST_QUESTION, postQuestion);

  yield take(LOCATION_CHANGE);
  yield cancel(questionPost);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
