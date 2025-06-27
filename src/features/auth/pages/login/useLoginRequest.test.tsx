import React from 'react';
import {render, fireEvent, screen, renderHook, waitFor} from '@testing-library/react';
import '@testing-library/dom';
import useLoginRequest from './useLoginRequest';
import { User } from '../../types';
import { BrowserRouter } from 'react-router';
import { AuthContext, useAuthContext } from '../../../../context/AuthContext';

const mockResponse: User = {
    username: 'username',
    email: 'email',
    totalBalance: 0,
    token: 'token',
    userId: 'userId',
    emailConfirmed: true
};

let setItemMock: jest.Mock;


beforeAll(() => {
    setItemMock = jest.fn();

    Object.defineProperty(window, 'localStorage', {
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


test('Makes login request, sets token to local storage', async () => {
    let request = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
    } as Response);

    const { result } = renderHook(() => useLoginRequest(), {
      wrapper: ({ children }) => 
        <BrowserRouter>
          <AuthContext.Provider value={useAuthContext()}>{children}</AuthContext.Provider>
        </BrowserRouter>
    });

    await result.current.login(
      { email: 'email', password: 'password' },
      (error: string) => {}
    );
    
    await waitFor(() => {
      expect(request).toHaveBeenCalled();
      expect(setItemMock).toHaveBeenCalledWith('jwtToken', 'token');
    })
})

test('Makes login request, updates user in auth context', async () => {
  let request = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
  } as Response);

  let authContext = {
    user: null,
    setUser: jest.fn(),
    refetchUser: () => {},
    loadingUser: false
  }
  
  const { result } = renderHook(() => useLoginRequest(), {
    wrapper: ({ children }) => 
      <BrowserRouter>
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
      </BrowserRouter>
  });

  await result.current.login(
    { email: 'email', password: 'password' },
    (error: string) => {}
  );
  
  await waitFor(() => {
    expect(request).toHaveBeenCalledTimes(1);
    expect(authContext.setUser).toHaveBeenCalledWith(mockResponse);
  })
})
