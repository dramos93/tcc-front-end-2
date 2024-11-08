import Game from '../pages/game';
import Home from '../pages/home';
import Login from "../pages/login";
import MainLayout from '../layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext } from 'react';
import Users from '../pages/users';
import Dashboard from '../pages/dashboard';

const privateRoutes = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute >
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/home", element: <Home /> },
            { path: "/users", element: <Users /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/game", element: <Game /> },
            { path: "/*", element: <Home /> },
        ],
    },
]);


const publicRoutes = createBrowserRouter([
    {
        path: "/*",
        element: <Login />,
    },
]);


const nullRoutes = createBrowserRouter([
    {
        path: "/*",
        element: <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-3rem',
            marginLeft: '-3rem'
        }}>
            <CircularProgress size="6rem" />
        </Box>
    }
]);

export default function Routes() {
    const { isAuthenticated, token } = useContext(AuthContext);

    let router = token ? privateRoutes : publicRoutes;

    return ((token === null) || (isAuthenticated === null)) ? <RouterProvider router={nullRoutes} /> : <RouterProvider router={router} />;
}
