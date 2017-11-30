import { createSelector } from 'reselect';

/**
 * Direct selector to the coursePage state domain
 */
const selectCoursePageDomain = () => (state) => state.get('coursePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CoursePage
 */

const makeSelectCoursePage = () => createSelector(
  selectCoursePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCoursePage;
export {
  selectCoursePageDomain,
};
