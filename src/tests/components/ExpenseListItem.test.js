import React from 'react';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

test('should render ExpenseListItem with fixture data', () => {
  const createMockStore = configureMockStore([thunk]);
  const store = createMockStore();
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

