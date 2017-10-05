
import { fromJS } from 'immutable';
import questionsPageReducer from '../reducer';

describe('questionsPageReducer', () => {
  it('returns the initial state', () => {
    expect(questionsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
