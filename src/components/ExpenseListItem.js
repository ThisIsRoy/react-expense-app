import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt, browserHistory }) => (
  <div>
    <h3>{description}</h3>
    <p>Amount: {amount}</p>
    <p>Created: {createdAt}</p>
    <Link to={"/edit/" + id}><button>Edit</button></Link>
  </div>
);

export default ExpenseListItem;