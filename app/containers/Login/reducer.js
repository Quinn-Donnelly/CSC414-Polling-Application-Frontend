/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGGED_IN,
} from './constants';

const initialState = fromJS({
  user: {},
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGGED_IN:
      return state
        .set('user', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
