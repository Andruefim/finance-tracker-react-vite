import React, { useState } from 'react';
import { Button, FormHelperText, Link, styled, TextField, Typography} from '@mui/material';
import { useFormik } from "formik"
import AuthCard from '../../components/AuthCard';
import { sendEmailConfirmation } from '../../../../api/confirmEmail';
import useConfirmEmail from './useConfirmEmail';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
}))

export interface ConfirmEmailData {
    code: string;
}

interface ConfirmEmailProps {
    onSubmit: (formData: ConfirmEmailData, setError: (error: string) => void) => void;
}

const ConfirmEmailForm = ({ onSubmit }: ConfirmEmailProps) => {
    const [error, setError] = useState<string | null>(null);

    const { handleSubmit, values, handleChange, errors, touched } = useFormik<ConfirmEmailData>({
        initialValues: {
            code: ''
        },
        onSubmit: (formData, { resetForm }) => {
            onSubmit(formData, setError)
        }
    })

    return (
        <AuthCard title="Email confirmation">
            <StyledForm onSubmit={handleSubmit}>
                <Typography textAlign='left'>Confirmation code was sent to your email adress. Please write it below to verify your email.</Typography>
                <TextField 
                    name='code'
                    type='text'
                    label='Confirmation code'
                    placeholder="000-000"
                    onChange={handleChange}
                    value={values.code}
                    variant='outlined'
                    error={touched.code && Boolean(errors.code)}
                    required
                />
                <Typography>Haven't received an email? <Link onClick={() => sendEmailConfirmation()}>Send again</Link></Typography>

                <Button color='primary' type='submit' variant='contained'>Continue</Button>
                <FormHelperText>{error}</FormHelperText>
            </StyledForm>
        </AuthCard>
    )
}

export default ConfirmEmailForm;