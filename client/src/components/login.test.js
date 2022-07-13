import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('Password input should be rendered', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test('Button should be rendered', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const buttonInputEl = screen.getByRole('button');
  expect(buttonInputEl).toBeInTheDocument();
});

test('Email input should be empty', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  expect(emailInputEl.value).toBe('');
});

test('Password input should be empty', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe('');
});

test('Email input should change', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const testValue = 'test@email.com';

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test('Password input should change', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test-password';

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl).toBeInTheDocument();
});

