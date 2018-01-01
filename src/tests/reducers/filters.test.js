import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, '@@init');
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const action = { type: 'SORT_BY_AMOUNT' }
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = { type: 'SET_TEXT_FILTER', text: 'test filter' };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('test filter');
});

test('should set start date filter', () => {
  const startDate = moment();
  const action = { type: 'SET_START_DATE', startDate: startDate };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate);
});

test('should set end date filter', () => {
  const endDate = moment();
  const action = { type: 'SET_END_DATE', endDate: endDate };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(endDate);
});

