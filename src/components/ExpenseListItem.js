import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = ({ dispatch, id, description, amount, createdAt, browserHistory }) => (
  <div>
    <Link className="list-item" to={"/edit/" + id}>
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__subtitle">{numeral(amount / 100).format('$0,0.00')}</span>
      </div>
      <h3 className="list-item__data">{moment(createdAt).format('MMMM Do, YYYY')}</h3>
    </Link>
  </div>
);

export default ExpenseListItem;