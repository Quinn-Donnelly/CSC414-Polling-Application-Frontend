/*
 *
 * CoursePage actions
 *
 */

import {
  DEFAULT_ACTION,
  POST_QUESTION,
  GET_RESPONSES,
  GOT_RESPONSES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getResponses(questionId) {
  return {
    type: GET_RESPONSES,
    questionId,
  };
}

export function gotResponses(questionId, responses) {
  return {
    type: GOT_RESPONSES,
    questionId,
    responses,
  };
}

/**
 * This will post questions to the server
 * @param  {string} question A string with the questions TextField
 * @param  {[string]} answers  An array of string for the multiple choice Answers
 * @return {object}          Returns the POST_QUESTION object
 */
export function postQuestion(question, answers) {
  return {
    type: POST_QUESTION,
    question,
    answers,
  };
}
