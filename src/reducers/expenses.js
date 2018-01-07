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
            ...action.updates //spread operators to replace old information
          }
        } else {
          return eachExpense;
        }
      });
    case 'SET_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};

export default expensesReducer;