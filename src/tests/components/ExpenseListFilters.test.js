import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(<ExpenseListFilters 
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />);
});

test('should render ExpenseListFilters correct', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters correct', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const textChange = 'tickets for basketball game';
  wrapper.find('input').simulate('change', { target: { value: textChange } });
  expect(setTextFilter).toHaveBeenLastCalledWith(textChange);
});

test('should sort by date', () => {
  wrapper.find('select').simulate('change', { target: { value: 'date' } });
  expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should sort by amount', () => {
  wrapper.find('select').simulate('change', { target: { value: 'amount' } });
  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(10, 'day');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ 
    startDate: startDate,
    endDate: endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const dateChange = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(dateChange);
  expect(wrapper.state('calendarFocused')).toBe(dateChange);
});




