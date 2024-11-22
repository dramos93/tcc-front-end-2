import Game from '../pages/game';
import Home from '../pages/home';
import Login from "../pages/login";
import MainLayout from '../layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext } from 'react';
import Dashboard from '../pages/dashboard';

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
    const { isAuthenticated, token, userName, roleUser } = useContext(AuthContext);
    const privateTeacherRoutes = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute >
                    <MainLayout />
                </PrivateRoute>
            ),
            children: [
                { path: "/", element: <Home /> },
                { path: "/dashboard", element: <Dashboard /> },
                { path: "/*", element: <Home /> },
            ],
        },
    ]);
    const privateStudentRoutes = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute >
                    <MainLayout />
                </PrivateRoute>
            ),
            children: [
                { path: "/", element: <Home /> },
                { path: "/game", element: <Game /> },
                { path: "/*", element: <Home /> },
            ],
        },
    ]);

    const createRoutes = () => {
        if ((token === null) || (isAuthenticated === null)) return nullRoutes;
        if (token && !userName) return nullRoutes;
        if (token && userName) {
            if (parseInt(roleUser as string) === 1) return privateTeacherRoutes;
            else if  (parseInt(roleUser as string) === 2) return privateStudentRoutes;
            // else return publicRoutes;
        };
        return publicRoutes;
    };

    return <RouterProvider router={createRoutes()} />;
}
