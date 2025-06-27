import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Sidenav from '../components/layout/Sidenav';

const MainLayout = () => {
    return (
        <Stack flexDirection='row'>
            <Sidenav />
            <Outlet />
        </Stack>
    )
}

export default MainLayout;