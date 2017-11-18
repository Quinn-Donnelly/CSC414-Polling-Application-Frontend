/*
 *
 * CourseList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOADED_CLASSES,
} from './constants';

const initialState = fromJS({
  classes: [],
});

function courseListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOADED_CLASSES:
      return state
        .set('classes', fromJS(action.payload));
    default:
      return state;
  }
}

export default courseListReducer;
