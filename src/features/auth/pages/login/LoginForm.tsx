import React, { useState } from 'react';
import { Button, FormHelperText, Link, styled, TextField, Typography} from '@mui/material';
import { useFormik } from "formik"
import AuthCard from '../../components/AuthCard';
import { REGISTER } from '../../../../constants/routes';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
}))

export interface LoginData {
    email: string;
    password: string;
}

interface LoginFormProps {
    onLoginSubmit: (formData: LoginData, setError: (error: string) => void) => void;
}

const LoginForm = ({ onLoginSubmit }: LoginFormProps) => {
    const [error, setError] = useState<string | null>(null);

    const { handleSubmit, values, handleChange, errors, touched } = useFormik<LoginData>({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (formData, { resetForm }) => {
            onLoginSubmit(formData, setError)
        }
    })

    return (
        <AuthCard title="Login">
            <StyledForm onSubmit={handleSubmit}>
                <TextField 
                    name='email'
                    type='email'
                    label='Email'
                    onChange={handleChange}
                    value={values.email}
                    variant='outlined'
                    error={touched.email && Boolean(errors.email)}
                    required
                />
                <TextField 
                    name='password'
                    type='password'
                    label='Password'
                    onChange={handleChange}
                    value={values.password}
                    variant='outlined'
                    error={touched.password && Boolean(errors.password)}
                    required
                />
                <Typography>Dont have an account? <Link href={REGISTER}>Register</Link></Typography>

                <Button color='primary' type='submit' variant='contained'>Login</Button>
                <FormHelperText>{error}</FormHelperText>
            </StyledForm>
        </AuthCard>
    )
}

export default LoginForm;