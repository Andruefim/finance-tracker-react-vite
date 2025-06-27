import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../../../../api/user';
import { DASHBOARD } from '../../../../constants/routes';
import { AuthContext } from '../../../../context/AuthContext';
import { saveToken } from '../../../../services/jwt';

import { LoginData } from './LoginForm';

const useLoginRequest = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogin = async (values: LoginData, setError: (error: string) => void) => {
        const user = await login(values, setError);
        if (!user) return;

        saveToken(user.token);
        setUser(user);
        navigate(DASHBOARD);
    }

    return {
        login: handleLogin
    }
}

export default useLoginRequest;