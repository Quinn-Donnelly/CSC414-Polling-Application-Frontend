/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  LOG_IN,
  LOGGED_IN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logIn(email, pass) {
  return {
    type: LOG_IN,
    email,
    pwd: pass,
  };
}

// TODO: Currently going to store all login info from the api in plain text to the
// reducer need to encrypt the token and use cookies with a fallback
export function loggedIn(info) {
  return {
    type: LOGGED_IN,
    payload: info,
  };
}
