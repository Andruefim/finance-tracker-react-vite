import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { sendEmailConfirmation, confirmEmail } from '../../../../api/confirmEmail';
import { DASHBOARD } from '../../../../constants/routes';
import { AuthContext } from '../../../../context/AuthContext';


import { ConfirmEmailData } from './ConfirmEmailForm';

const useConfirmEmail = () => {
    const { user, refetchUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        checkEmailConfirmed();
    },[user]);

    useEffect(()=>{
        initEmailConfirmation();
    },[])

    const checkEmailConfirmed = () => {
        user?.emailConfirmed && navigate(DASHBOARD);
    }

    const initEmailConfirmation = async () => {
        if (sessionStorage.getItem('confirmationSent')) return;
        sessionStorage.setItem('confirmationSent', 'true')
        await sendEmailConfirmation();
    }

    const handleConfirmEmail = async (values: ConfirmEmailData, setError: (err: string) => void) => {
        const confirmEmailResult = await confirmEmail(values, setError);
        confirmEmailResult?.emailConfirmed && refetchUser();
    }

    return {
        handleConfirmEmail,
        initEmailConfirmation
    }
}

export default useConfirmEmail;