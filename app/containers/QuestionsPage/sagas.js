import { take, call, takeEvery, select, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import { makeSelectLocationState } from '../App/selectors';
import {
  GET_QUESTIONS,
} from './constants';
import { gotQuestions } from './actions';

export function* getQuestions() {
  const routerState = yield select(makeSelectLocationState());
  const classroomId = routerState.locationBeforeTransitions.pathname.split('/')[2];

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestURL = `${API_URL}/classrooms/${classroomId}/questions`;
  try {
    // Call our request helper (see 'utils/request')
    const questions = yield call(request, requestURL, options);
    yield put(gotQuestions(questions));
  } catch (err) {
    console.error(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const getQuestionsWatcher = yield takeEvery(GET_QUESTIONS, getQuestions);

  yield take(LOCATION_CHANGE);
  yield cancel(getQuestionsWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
