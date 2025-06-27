import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import Header from '../components/layout/Header';

const MinimalLayout = () => {
    return (
        <Box>
            <Header />
            <Outlet />
        </Box>
    )
}

export default MinimalLayout;