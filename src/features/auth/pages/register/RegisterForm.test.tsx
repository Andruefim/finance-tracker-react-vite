import React from 'react';
import {getByText, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';


beforeAll(() => {})
afterAll(() => {})

test('submits form and passes formdata to register callback', async () => {
    const onRegisterSubmit = jest.fn();

    render(<RegisterForm onRegisterSubmit={onRegisterSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/user name/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button');

    await waitFor(() => userEvent.type(emailInput, 'email@adress.com'));
    await waitFor(() => userEvent.type(usernameInput, 'username'))
    await waitFor(() => userEvent.type(passwordInput, '1241'));
    await waitFor(() => userEvent.type(confirmPasswordInput, '1241'));
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(()=>{
        expect(onRegisterSubmit).toHaveBeenCalledWith(
            { 
                email: 'email@adress.com', 
                username: 'username',
                password: '1241',
            },
            expect.any(Function)
        )
    })
})

test('submit action checks passwords matching and displays error', async () => {
    const onRegisterSubmit = jest.fn();

    render(<RegisterForm onRegisterSubmit={onRegisterSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/user name/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button');

    await waitFor(() => userEvent.type(emailInput, 'email@adress.com'));
    await waitFor(() => userEvent.type(usernameInput, 'username'))
    await waitFor(() => userEvent.type(passwordInput, '1241'));
    await waitFor(() => userEvent.type(confirmPasswordInput, '12'));
    await waitFor(() => userEvent.click(submitButton));

    await waitFor(()=>{
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInvalid();
    })
})