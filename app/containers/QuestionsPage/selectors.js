import { createSelector } from 'reselect';

/**
 * Direct selector to the questionsPage state domain
 */
const selectQuestionsPageDomain = () => (state) => state.get('questionsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuestionsPage
 */

const makeSelectQuestionsPage = () => createSelector(
  selectQuestionsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectQuestionsPage;
export {
  selectQuestionsPageDomain,
};
