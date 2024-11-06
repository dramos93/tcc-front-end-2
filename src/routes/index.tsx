import { Navigate, useRoutes } from 'react-router-dom';
import React from 'react';
// project import
import LoginRoutes from './LoginRoutes';
import Login from "../pages/login";
import MainLayout from '../layout/MainLayout';
import LoginLayout from "../layout/LoginLayout";
import Home from '../pages/home';


import { BrowserRouter, RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
// import MainRoutes from './MainRoutes';
import CheckAuth from './CheckAuth';
// ==============================|| ROUTING RENDER ||============================== //
// MainRoutes
// LoginRoutes


const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute CheckAuth={CheckAuth}>
            <MainLayout />
        </PrivateRoute>,
        children: [
            // {
            //     path: "/",
            //     element:
            //         <Home />
            // },
            {
                path: "/home",
                element:
                    <Home />
            },
            // {
            //     path: "/login",
            //     element:
            //         <Home />
            // },
            // {
            //     path: "/team",
            //     element: (
            //         <h1>TEAM</h1>
            //     ),
            // },
            // {
            //     path: "/*",
            //     element:
            //         <Home />
            //     // <Navigate to="/home" />
            // },
        ],
    },
    {
        path: "/login",
        element: (
            <Login />
            // <PrivateRoute CheckAuth={CheckAuth}>
            //     <Login/>
            // </PrivateRoute>

        ),
        // children: [
        //     {
        //         path: "/",
        //         element: <Login />
        //     }
        // ]
    },
]);


export default function Routes() {
    return <RouterProvider router={router} />;
}