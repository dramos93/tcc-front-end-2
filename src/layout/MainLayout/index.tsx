import { Outlet } from 'react-router';
import MenuAppBar from '../menuAppBar';
import MenuDrawer from '../menuDrawer';
import { Box, Toolbar } from '@mui/material';
import { Navigate } from 'react-router-dom';
import React from 'react';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <MenuAppBar />
            <MenuDrawer />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout