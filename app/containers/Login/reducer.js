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

const initalToken = document.cookie;
const initialState = fromJS({
  user: cookieToObject(initalToken),
});

function cookieToObject(cookie) {
  const str = cookie.split(';');
  const result = {};
  for (let i = 0; i < str.length; i += 1) {
    const cur = str[i].split('=');
    result[cur[0].trim()] = cur[1].trim();
  }
  return result;
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGGED_IN:
      return state
        .set('user', fromJS(action.payload));
    default:
      return state;
  }
}

export default loginReducer;
