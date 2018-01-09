import authReducer from '../../reducers/auth';

test('reducer should call login correctly', () => {
  const action = { type: 'LOGIN', uid: '123' }; 
  const state = authReducer(undefined, action);
  expect(state.uid).toEqual(action.uid);
});

test('reducer should call logout correctly', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});