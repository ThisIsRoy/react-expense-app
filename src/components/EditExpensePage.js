import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import expenses from '../selectors/expenses';
import { startEditExpense, startRemoveExpense } from '../actions/expense';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onClick}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(eachExpense => eachExpense.id === props.match.params.id)
});

// removeExpense needs props as an input?
const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);