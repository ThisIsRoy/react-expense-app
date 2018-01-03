import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const expensesCount = props.expenses.length;
  const expensesSum = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');

  if (expensesCount === 0) {
    return (<h1>There are no active expenses!</h1>);
  } else if (expensesCount === 1) {
    return (<h1>Viewing 1 expense totalling {expensesSum}</h1>);
  } else {
    return (<h1>Viewing {expensesCount} expenses totalling {expensesSum}</h1>);
  }
};

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);
