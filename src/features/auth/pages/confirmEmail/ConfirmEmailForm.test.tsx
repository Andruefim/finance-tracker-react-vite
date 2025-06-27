import React from 'react';
import {render, fireEvent, screen, renderHook, act, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import ConfirmEmailForm from './ConfirmEmailForm';


export interface FormData {
    email: string;
    password: string;
}


beforeAll(() => {})
afterAll(() => {})

test('submits form and passes formdata to confirm email callback', async () => {
    const onSubmit = jest.fn();

    render(<ConfirmEmailForm onSubmit={onSubmit}/>)

    const emailInput = screen.getByLabelText(/code/i);
    const submitButton = screen.getByRole('button');

    await waitFor(() => userEvent.type(emailInput, '3344'))
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(()=>{
        expect(onSubmit).toHaveBeenCalledWith(
            { code: '3344' },
            expect.any(Function)
        )
    })

})