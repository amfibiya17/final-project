import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from './login';

test('Email input should be rendered', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  expect(emailInputEl).toBeInTheDocument();
});