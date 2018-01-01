import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set expense reducer default state', () => {
  const state = expensesReducer(undefined, { type: '@@init' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '1' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove an invalid id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '4',
      description: 'laundry',
      note: '',
      amount: 200,
      createdAt: 0
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '3',
    updates: {
      description: 'edited',
      createdAt: 0
    }
  };
  const editedExpense = {
    id: '3',
    description: 'edited',
    note: '',
    amount: 4500,
    createdAt: 0
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[1], editedExpense]);
});

test('should not edit expense for invalid id', () => {
  const action = { 
    type: 'EDIT_EXPENSE', 
    id: '-1',
    updates: {
      description: 'error in update',
      amount: 500000
    } 
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
