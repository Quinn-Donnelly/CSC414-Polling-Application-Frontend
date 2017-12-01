/*
 *
 * QuestionsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GOT_QUESTIONS,
} from './constants';
import {
    LOG_OUT,
} from '../Login/constants';

const initialState = fromJS({
  questions: [],
});

function questionsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GOT_QUESTIONS:
      return state
        .set('questions', action.questions);
    case LOG_OUT:
      return state
        .set('questions', []);
    default:
      return state;
  }
}

export default questionsPageReducer;
