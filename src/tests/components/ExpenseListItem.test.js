import React from 'react';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

test('should render ExpenseListItem with fixture data', () => {
  const createMockStore = configureMockStore([thunk]);
  const store = createMockStore();
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} allExpenses={expenses} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call the delete button correctly', () => {
  const onClick = jest.fn();
  const startRemoveButton = jest.fn();
  const preventDefault = jest.fn();
  const wrapper = shallow(<ExpenseListItem onClick={onClick} startRemoveButton={startRemoveButton} />);
  wrapper.find('button').simulate('click', {
    preventDefault: () => {

    }
  });
  expect(onClick).toHaveBeenLastCalledWith();
});
