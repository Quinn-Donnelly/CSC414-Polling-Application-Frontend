import { take, call, select, takeEvery, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import { makeSelectLocationState } from '../App/selectors';
import {
  POST_QUESTION,
  GET_RESPONSES,
} from './constants';
import { gotResponses } from './actions';

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

export function* fetchResponses(action) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestURL = `${API_URL}/questions/${action.questionId}/answers`;
  try {
    // Call our request helper (see 'utils/request')
    const answers = yield call(request, requestURL, options);
    const results = [0, 0, 0];
    for (let i = 0; i < answers.length; i += 1) {
      results[answers[i].response.answer] += 1;
    }
    console.log(results);
    console.log(answers);
    yield put(gotResponses(action.questionId, results));
  } catch (err) {
    console.error(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const questionPost = yield takeEvery(POST_QUESTION, postQuestion);
  const fetchResponsesWatcher = yield takeEvery(GET_RESPONSES, fetchResponses);

  yield take(LOCATION_CHANGE);
  yield cancel(questionPost);
  yield cancel(fetchResponsesWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
