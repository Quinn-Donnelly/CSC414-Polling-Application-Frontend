/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  JOIN_CLASS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function joinClass(shortid) {
  return {
    type: JOIN_CLASS,
    shortid,
  };
}
