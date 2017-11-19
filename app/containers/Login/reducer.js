/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGGED_IN,
  LOG_OUT,
} from './constants';

const initalToken = document.cookie;
const initialState = fromJS({
  user: (initalToken !== '') ? cookieToObject(initalToken) : {},
  logged: initalToken !== '',
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
        .set('user', fromJS(action.payload))
        .set('logged', true);
    case LOG_OUT:
      return state
        .set('user', '')
        .set('logged', false);
    default:
      return state;
  }
}

export default loginReducer;
