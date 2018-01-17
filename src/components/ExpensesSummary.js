import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
  const expensesCount = props.expenses.length;
  const hiddenExpensesCount = props.allExpenses.length - expensesCount;
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const hiddenExpenseWord = hiddenExpensesCount === 1 ? 'expense' : 'expenses';
  const expensesSum = numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{expensesSum}</span></h1>
        <h3 className="page-header__subtitle">Hiding <span>{hiddenExpensesCount}</span> {hiddenExpenseWord}</h3>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters),
  allExpenses: state.expenses
});

export default connect(mapStateToProps)(ExpensesSummary);
