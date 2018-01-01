import { addExpense, editExpense, removeExpense } from '../../actions/expense';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123' });
  // must use toEqual instead of toBe for arrays and objects
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
});

test('should setup edit expense action object', () => {
  const id = '123';
  const action = editExpense(id, { note: 'new note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: {
      note: 'new note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'rent',
    amount: 109500,
    createdAt: 2650,
    note: 'last month rent'
  };
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});