import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router';

const AuthLayoutBox = styled(Box)(({ theme }) => ({
    height: `calc(100vh - 64px)`,
    display: 'flex',
    flexDirection: 'column'
}))

const Footer = styled('footer')(({ theme }) => ({
    height: 64,
    margin: '0 auto'
}))

const AuthLayout = () => {
    const year = new Date().getFullYear();

    return (
        <AuthLayoutBox>
            <Outlet />
            <Footer>
                Copyright {year}
            </Footer>
        </AuthLayoutBox>
    )
}

export default AuthLayout;