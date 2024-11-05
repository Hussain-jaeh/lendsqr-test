import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login component', () => {
  it('should have an email and password field, and a submit button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordField = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should show error messages when required fields are empty', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText(/please enter your email/i);
      const passwordError = screen.getByText(/please enter your password/i);
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it('should allow a user to submit their email and password', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordField = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailField, 'okwudirejoy@gmail.com');
    userEvent.type(passwordField, 'password');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  it('should show an error message for invalid email format', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailField, 'invalid-email');
    userEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText(/invalid email format/i);
      expect(emailError).toBeInTheDocument();
    });
  });

  it('should reset the form fields after successful submission', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailField = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    const passwordField = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailField, 'okwudirejoy@gmail.com');
    userEvent.type(passwordField, 'password');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailField.value).toBe('');  // Now TypeScript knows it's an HTMLInputElement
      expect(passwordField.value).toBe('');  // Now TypeScript knows it's an HTMLInputElement
    });
  });
});
