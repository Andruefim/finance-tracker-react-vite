import React, { useState } from 'react';
import { Button, FormHelperText, Link, styled, TextField, Typography} from '@mui/material';
import { useFormik } from "formik"
import AuthCard from '../../components/AuthCard';
import { LOGIN } from '../../../../constants/routes';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
}))

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps {
    onRegisterSubmit: (formData: RegisterData, setError: (error: string) => void) => void;
};

export default function RegisterForm ({ onRegisterSubmit }: RegisterFormProps) {
    const [error, setError] = useState<string | null>(null);

    const { handleSubmit, values, handleChange, errors, touched } = useFormik<RegisterFormData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: ({ confirmPassword, ...formData}, { resetForm, setFieldError }) => {
            if (confirmPassword !== formData.password) return setFieldError('confirmPassword', 'Passwords do not match');
            onRegisterSubmit(formData, setError)
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
                    required
                    error={touched.email && Boolean(errors.email)}
                />
                <TextField 
                    name='username'
                    type='text'
                    label='User name'
                    onChange={handleChange}
                    value={values.username}
                    variant='outlined'
                    required
                    error={touched.username && Boolean(errors.username)}
                />
                <TextField 
                    name='password'
                    type='password'
                    label='Password'
                    onChange={handleChange}
                    value={values.password}
                    variant='outlined'
                    required
                    error={touched.password && Boolean(errors.password)}
                />
                <TextField 
                    name='confirmPassword'
                    type='password'
                    label='Confirm password'
                    onChange={handleChange}
                    value={values.confirmPassword}
                    variant='outlined'
                    helperText={(touched.confirmPassword && Boolean(errors.confirmPassword)) && errors.confirmPassword}
                    required
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                />
                <Typography>Already have an account? <Link href={LOGIN}>Login</Link></Typography>

                <Button color='primary' type='submit' variant='contained'>Register</Button>
                <FormHelperText>{error}</FormHelperText>
            </StyledForm>
        </AuthCard>
    )
}