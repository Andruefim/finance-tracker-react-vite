import React from 'react';
import { useNavigate } from 'react-router';
import { register } from '../../../../api/user';
import { LOGIN } from '../../../../constants/routes';

import { RegisterData } from './RegisterForm';

const useRegisterRequest = () => {
    const navigate = useNavigate();

    const handleRegister = async (values: RegisterData, setError: (error: string) => void) => {
        const response = await register(values, setError);

        if (response?.message) navigate(LOGIN);
    }

    return {
        register: handleRegister
    }
}

export default useRegisterRequest;