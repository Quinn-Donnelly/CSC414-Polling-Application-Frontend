
import { fromJS } from 'immutable';
import courseListReducer from '../reducer';

describe('courseListReducer', () => {
  it('returns the initial state', () => {
    expect(courseListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
