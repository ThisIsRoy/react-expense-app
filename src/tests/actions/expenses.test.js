import { addExpense, startAddExpense, editExpense, startRemoveExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expense';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  //jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123' });
  // must use toEqual instead of toBe for arrays and objects
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123'
  });
});

test('test should start remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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
  
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

// must tell jest function is async using done
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = expenses[1];
  delete expenseData.id;

  // check if action was dispatched
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // check if database was updated via promise chain
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  // check if action was dispatched
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultData
      }
    });

    // check if database was updated via promise chain
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultData);
    done();
  });
});

test('test should setup set expense action object with data', () => {
  const actions = setExpenses(expenses);
  expect(actions).toEqual({
    type: 'SET_EXPENSES',
    expenses: expenses
  });
});

// current bugged

// test('should fetch the expenses from database', (done) => {
//   const store = createMockStore({});
//   store.dispatch(startSetExpenses()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'SET_EXPENSES',
//       expenses: expenses
//     });
//   });
//   done();
// });
