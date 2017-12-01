import { take, call, takeEvery, select, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { API_URL } from '../App/constants';
import { makeSelectLocationState } from '../App/selectors';
import { selectUserId } from '../Login/selectors';
import { makeSelectQuestions } from './selectors';
import {
  GET_QUESTIONS,
  ANSWER_QUESTION,
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

export function* answerQuestion(action) {
  const questions = yield select(makeSelectQuestions());
  const studentId = yield select(selectUserId());
  const questionId = questions[action.questionIdx].id;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questionId,
      studentId,
      response: {
        answer: action.answer,
      },
    }),
  };

  const requestURL = `${API_URL}/answers`;
  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    const qs = questions.filter((value, idx) => {
      if (idx !== action.questionIdx) {
        return true;
      }
      return false;
    });
    yield put(gotQuestions(qs));
  } catch (err) {
    console.error(err);
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  const getQuestionsWatcher = yield takeEvery(GET_QUESTIONS, getQuestions);
  const answerQuestionWatcher = yield takeEvery(ANSWER_QUESTION, answerQuestion);

  yield take(LOCATION_CHANGE);
  yield cancel(getQuestionsWatcher);
  yield cancel(answerQuestionWatcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
