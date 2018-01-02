import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({ dispatch, id, description, amount, createdAt, browserHistory }) => (
  <div>
    <h3>{description}</h3>
    <p>Amount: {numeral(amount / 100).format('$0,0.00')}</p>
    <p>Created: {moment(createdAt).format('MMMM Do, YYYY')}</p>
    <Link to={"/edit/" + id}><button>Edit</button></Link>
  </div>
);

export default ExpenseListItem;