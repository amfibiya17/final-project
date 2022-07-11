import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PersonalCalendar from './personalCalendar';

test('Can click on date', () => {
  const { container } = render(
    <Router>
      <PersonalCalendar />
    </Router>
  );
  expect(container.firstChild.classList.contains('react-calendar')).toBe(true)
});
