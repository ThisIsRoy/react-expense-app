import uuid from 'uuid';
import database from '../firebase/firebase';
import expenses from '../reducers/expenses';

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates: updates
});

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses: expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnap) => {
        expenses.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};