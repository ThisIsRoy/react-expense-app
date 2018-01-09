import { login, logout } from '../../actions/auth';

test('should call login correctly with given id', () => {
  const id = '134dk4';
  const action = login(id);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: id
  });
});

test('should call logout correctly', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});