
import { fromJS } from 'immutable';
import coursePageReducer from '../reducer';

describe('coursePageReducer', () => {
  it('returns the initial state', () => {
    expect(coursePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
