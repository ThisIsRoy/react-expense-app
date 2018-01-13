import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { startRemoveExpense } from '../actions/expense';

export class ExpenseListItem extends React.Component {
  constructor(props) {
    super(props);
  };

  onClick = (e) => {
    e.preventDefault();
    this.props.startRemoveExpense({ id: this.props.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <Link className="list-item" to={"/edit/" + this.props.id}>
        <div>
          <h3 className="list-item__title">{this.props.description}</h3>
          <span className="list-item__subtitle">{numeral(this.props.amount / 100).format('$0,0.00')}</span>
        </div>
        <div>
          <h3 className="list-item__data">{moment(this.props.createdAt).format('MMMM Do, YYYY')}</h3>
          <button onClick={this.onClick} className="button--small">Remove</button>
        </div>
     </Link>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(ExpenseListItem);