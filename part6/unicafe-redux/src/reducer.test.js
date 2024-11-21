import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('good, ok and bad are properly incremented', () => {
    let newState = {
      good: 4,
      ok: 3,
      bad: 1,
    };
    deepFreeze(newState);

    const actions = [{ type: 'GOOD' }, { type: 'OK' }, { type: 'BAD' }];

    // Apply each action sequentially
    actions.forEach((action) => {
      newState = counterReducer(newState, action);
      deepFreeze(newState);
    });

    expect(newState).toEqual({
      good: 5,
      ok: 4,
      bad: 2,
    });
  });
});
