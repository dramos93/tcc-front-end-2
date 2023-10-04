import Home from '../pages/home';
import Users from '../pages/users';
import MainLayout from '../layout/MainLayout';
import Game from '../pages/game';
import Dashboard from '../pages/dashboard';
import { TypeUser, useAuth } from '../hooks/useAuth';
import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';


export interface PathObject { key: string, roles: Array<TypeUser>; }

export const pathToRole: Array<PathObject> = [
    {
        key: 'home',
        roles: [TypeUser.admin, TypeUser.student],
    },
    {
        key: 'users',
        roles: [TypeUser.admin]
    },
    {
        key: 'dashboards',
        roles: [TypeUser.admin]
    },
    {
        key: 'game',
        roles: [TypeUser.student]
    }
];

export const getRoles = (key: string): Array<TypeUser> | undefined => {
    return pathToRole.find(item => item.key === key)?.roles;
};



function PrivateRoutes({ element, roles }: { element: React.ReactElement, roles: Array<TypeUser> | undefined; }): React.ReactElement {
    const { user } = useAuth();
    return roles?.includes(user.role) ? element : <Home />;
}

export interface childrenType {
    path: string;
    element: NonIndexRouteObject['element'];
    key?: string;
    title?: string;
}

interface mainType {
    path: NonIndexRouteObject['path'];
    element: NonIndexRouteObject['element'];
    children?: Array<childrenType>;

}

const MainRoutes: mainType = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <PrivateRoutes element={<Home />} roles={getRoles('home')} />,
            key: 'home',
            title: 'Home'

        },
        {
            path: "/users",
            element: <PrivateRoutes element={<Users />} roles={getRoles('users')} />,
            key: 'users',
            title: 'Users'

        },
        {
            path: "/dashboard",
            element: <PrivateRoutes element={<Dashboard />} roles={getRoles('dashboards')} />,
            key: 'dashboards',
            title: 'Dashboard'
        },
        {
            path: "/game",
            element: <PrivateRoutes element={<Game />} roles={getRoles('game')} />,
            key: 'game',
            title: 'Game'
        },
        {
            path: "/*",
            element: <Home />,
        },
    ]
};

export default MainRoutes;