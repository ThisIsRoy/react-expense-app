import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render a single expense correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} allExpenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render multiple expenses correctly', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses} allExpenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});