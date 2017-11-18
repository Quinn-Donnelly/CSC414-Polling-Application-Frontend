import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = () => (state) => state.get('login');

/**
 * Other specific selectors
 */
const selectUserId = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.getIn(['user', 'userId'])
);

const selectToken = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.getIn(['user', 'id'])
);

/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLogin;
export {
  selectLoginDomain,
  selectUserId,
  selectToken,
};
