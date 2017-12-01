/*
 *
 * QuestionsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_QUESTIONS,
  GOT_QUESTIONS,
  ANSWER_QUESTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getQuestions() {
  return {
    type: GET_QUESTIONS,
  };
}

export function gotQuestions(questions) {
  return {
    type: GOT_QUESTIONS,
    questions,
  };
}

export function answerQuestion(questionIdx, answer) {
  return {
    type: ANSWER_QUESTION,
    questionIdx,
    answer,
  };
}
