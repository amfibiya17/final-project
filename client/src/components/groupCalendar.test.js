import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import GroupCalendar from './groupCalendar';

test('Button should be rendered', () => {
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const buttonInputEl = screen.getByRole('button', {
    name: /submit/i
  });
  expect(buttonInputEl).toBeInTheDocument();
});

test('Can click on date and date buttons to be rendered', () => {
  let newDate = new Date();
  let todaysDate = newDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const element = screen.getByRole('button', {
    //name: July 11, 2022. (Month Date, Year.)
    name: todaysDate
  })
  console.log(todaysDate);
  expect(element).toBeInTheDocument();
});

test('Can click on date and for the selected date to be shown', () => {
  let newDate1 = new Date();
  let todaysDate = newDate1.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  let newDate2 = new Date();
  let selectedDate = newDate2.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const element = screen.getByRole('button', {
    //name: July 11, 2022
    name: todaysDate
  })
  fireEvent.click(element);

  const dateInfoEl = screen.getByTestId('date-info');

  console.log(todaysDate);
  console.log(selectedDate);

  expect(dateInfoEl).toBeInTheDocument();
  expect(screen.getByTestId('selected-date')).toHaveTextContent(selectedDate);
});

test('event name input should be rendered', () => {
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const nameInputEl = screen.getByPlaceholderText(/event/i);
  expect(nameInputEl).toBeInTheDocument();
});

test('event name input should be empty', () => {
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const nameInputEl = screen.getByPlaceholderText(/event/i);
  expect(nameInputEl.value).toBe('');
});

test('event name input should change', () => {
  render(
    <Router>
      <GroupCalendar />
    </Router>
  );
  const nameInputEl = screen.getByPlaceholderText(/event/i);
  const testValue = 'test group dinner';

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
});
