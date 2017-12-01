/*
 *
 * CoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GOT_RESPONSES,
} from './constants';

const initialState = fromJS({
  responses: {},
});

function coursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GOT_RESPONSES:
      return state
        .setIn(['responses', action.questionId], action.responses);
    default:
      return state;
  }
}

export default coursePageReducer;
