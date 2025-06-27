import React, { PropsWithChildren } from 'react';
import {render, fireEvent, screen, renderHook, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import useConfirmEmail from './useConfirmEmail';
import { User } from '../../types';
import { BrowserRouter } from 'react-router';


const emailSentResponse = {
    confirmationSent: true
};

let setItemMock: jest.Mock;

beforeAll(() => {
    setItemMock = jest.fn();

    Object.defineProperty(window, 'sessionStorage', {
        value: {
            getItem: jest.fn(),
            setItem: setItemMock,
            removeItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });
});
afterEach(() => jest.restoreAllMocks())

test('sends confirmation email request onRender and writes response in sessionStorage', async () => {
    const req = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(emailSentResponse)
    } as Response);

    const { result } = renderHook(() => useConfirmEmail(), {
        wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
      });

    await waitFor(() => {
        expect(req).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith('confirmationSent', 'true');
    });
})
