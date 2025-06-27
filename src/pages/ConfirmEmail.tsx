import React from 'react';
import ConfirmEmailForm from '../features/auth/pages/confirmEmail/ConfirmEmailForm';
import useConfirmEmail from '../features/auth/pages/confirmEmail/useConfirmEmail';

const ConfirmEmail = () => {
    const { handleConfirmEmail } = useConfirmEmail();

    return (
        <ConfirmEmailForm onSubmit={handleConfirmEmail}/>
    )
}

export default ConfirmEmail;
