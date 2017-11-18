/*
 *
 * CourseList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_CLASSES,
  LOADED_CLASSES,
  ADD_CLASS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getClasses() {
  return {
    type: GET_CLASSES,
  };
}

export function classesLoaded(data) {
  return {
    type: LOADED_CLASSES,
    payload: data,
  };
}

export function addClass(name, secure) {
  return {
    type: ADD_CLASS,
    payload: {
      name,
      secure,
    },
  };
}
