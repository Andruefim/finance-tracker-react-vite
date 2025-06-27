import React, { PropsWithChildren } from 'react';
import { AuthContext, useAuthContext } from './AuthContext';


function ContextProvider({ children }: PropsWithChildren) {
  const authContext = useAuthContext();

  return (
    <AuthContext.Provider value={authContext}>
       {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;
