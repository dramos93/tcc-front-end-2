import Home from '../pages/home';
import Users from '../pages/users';
import MainLayout from '../layout/MainLayout';
import Game from '../pages/game';
import Dashboard from '../pages/dashboard';
// import { TypeUser, useAuth } from '../hooks/useAuth';
// import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import { AuthContext } from '../hooks/useAuth';
import React from 'react';


enum TypeUser {
    'admin' = 1,
    'student' = 2
}

export interface PathObject { key: string, roles: Array<TypeUser | string | null>; }

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
        roles: [TypeUser.student, TypeUser.admin]
    }
];

export const getRoles = (key: string): Array<string | TypeUser | null> | undefined => {
    return pathToRole.find(item => item.key === key)?.roles;
};



function PrivateRoutes({ element, roles }: { element: React.ReactElement, roles: Array<string | null | TypeUser> | undefined; }): React.ReactElement {
    // const { user } = useAuth();

    const { roleUser } = React.useContext(AuthContext);
    alert(roles)
    return roles?.includes(roleUser) ? element : <Home />;
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
            path: "/home",
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
        }
        // ,
        // {
        //     path: "/*",
        //     element: <Home />,
        // },
    ]
};

export default MainRoutes;