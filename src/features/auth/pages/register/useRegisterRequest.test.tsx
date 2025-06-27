import React from 'react';
import {render, fireEvent, screen, renderHook, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import useRegisterRequest from './useRegisterRequest';
import { User } from '../../types';
import { BrowserRouter } from 'react-router';

const mockResponse = {
    message: "User registered successfully"
};

const registerData = { 
    email: 'email', 
    username: 'username', 
    password: 'password', 
    confirmPassword: 'passwrod' 
}


beforeEach(() => {})
afterEach(() => jest.restoreAllMocks())

test('makes register request and returns user', async () => {
    const req = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
    } as Response)

    const { result } = renderHook(() => useRegisterRequest(), {
        wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>
      });

    await result.current.register(
      registerData,
      (error: string) => {}
    );
    
    await waitFor(()=>{
        expect(req).toHaveBeenCalledTimes(1);
    })
})