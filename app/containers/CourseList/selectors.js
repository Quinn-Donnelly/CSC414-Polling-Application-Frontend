import { createSelector } from 'reselect';

/**
 * Direct selector to the courseList state domain
 */
const selectCourseListDomain = () => (state) => state.get('courseList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CourseList
 */

const makeSelectCourseList = () => createSelector(
  selectCourseListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCourseList;
export {
  selectCourseListDomain,
};
