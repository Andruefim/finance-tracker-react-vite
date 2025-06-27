import React, { useContext } from 'react';
import LoginForm from '../features/auth/pages/login/LoginForm';
import useLoginRequest from '../features/auth/pages/login/useLoginRequest';


const Login = () => {
    const { login } = useLoginRequest();

    return (
        <LoginForm onLoginSubmit={login}/>
    )
}

export default Login;
