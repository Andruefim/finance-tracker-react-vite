import React from 'react';
import RegisterForm from '../features/auth/pages/register/RegisterForm';
import useRegisterRequest from '../features/auth/pages/register/useRegisterRequest';


const Register = () => {
    const { register } = useRegisterRequest();

    return (
        <RegisterForm onRegisterSubmit={register}/>
    )
}

export default Register;
