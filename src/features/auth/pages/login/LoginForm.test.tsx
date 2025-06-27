import React from 'react';
import {render, fireEvent, screen, renderHook, act, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';


export interface FormData {
    email: string;
    password: string;
}


beforeAll(() => {})
afterAll(() => {})

test('submits form and passes formdata to login callback', async () => {
    const onLoginSubmit = jest.fn();

    render(<LoginForm onLoginSubmit={onLoginSubmit}/>)

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button');

    await waitFor(() => userEvent.type(emailInput, 'email@adress.com'))
    await waitFor(() => userEvent.type(passwordInput, '1241'))
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(()=>{
        expect(onLoginSubmit).toHaveBeenCalledWith(
            { email: 'email@adress.com', password: '1241' },
            expect.any(Function)
        )
    })

})