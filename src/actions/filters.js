export const setTextFilter = (textFilter = '') => ({
  type: 'SET_TEXT_FILTER',
  text: textFilter
});

export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

export const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate: startDate
});

export const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate: endDate
});