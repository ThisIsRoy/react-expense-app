import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Expense action generators
const addExpense = (
  {
     description = '', note = '', amount = 0, createdAt = 0 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description: description,
    note: note,
    amount: amount,
    createdAt: createdAt
  }
});

const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates: updates
});

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(eachExpense => eachExpense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((eachExpense) => {
        if (eachExpense.id === action.id) {
          return {
            ...eachExpense,
            ...action.updates //spread operators
          }
        } else {
          return eachExpense;
        }
      });
    default:
      return state;
  }
};

// Filter action generators
const setTextFilter = (textFilter = '') => ({
  type: 'SET_TEXT_FILTER',
  text: textFilter
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
});

const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
});

//Filter reducer
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: action.sortBy
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};



// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((eachExpense) => {
    const startDateMatch = typeof startDate !== 'number' || eachExpense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || eachExpense.createdAt <= endDate;
    const textMatch = eachExpense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    // sort by newest first 
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    // sort by most expensive first
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 400, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByDate());
store.dispatch(sortByAmount());

//store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

//store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());

const demoState = {
  expenses : [{
    id: 'w23423d2s',
    description: 'Jan rent',
    note: 'final amount paid',
    amount: 54500, // in pennies
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }  
};

