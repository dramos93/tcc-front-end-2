import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/login";
// import axios from 'axios';

interface PrivateRouteProps {
    children: React.ReactElement;
    CheckAuth: () => Promise<boolean>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, CheckAuth }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const FetchAPI = async () => {
        const token = "b12b2740-909f-11ee-bb82-00d76d0a5bee";
        // const url = 'http://127.0.0.1:5000/auth';
        // const init: RequestInit = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token': token
        //     },
        //     // body: JSON.stringify(auth)
        // };
        // const f = await
        // fetch(url, init);
        // fetch("https://jsonplaceholder.typicode.com/todos/1")
        //     .then(res => {
        //         // if (!res.ok) {
        //         //     throw new Error('Erro na requisição');
        //         // }
        //         alert(res);
        //         // return res.json();
        //         return "asdasd";
        //         // return {'a': 's'}
        //     })
        //     // .then(data => {
        //     //     setUser(data as UserInterface);
        //     // })
        //     .catch(error => {
        //         alert(error.message);
        //     });

        await fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(data => alert(data))
            .catch(error => alert(error.message));

        // console.log(f);
        // await axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
        //     console.log(res);
        // }).catch(error => {
        //     alert(error.message);
        // });
    };

    useEffect(() => {
        const verifyAuth = async () => {
            FetchAPI();
            try {
                const authResult = await CheckAuth();
                setIsAuthenticated(authResult);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, [CheckAuth]);

    if (isAuthenticated === null) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>LOADING</h1>;
    }
    let location = useLocation();
    const next_page = location.pathname === "login" ? <Navigate to="/" /> : children;
    return isAuthenticated ? next_page : <Login />;
};

export default PrivateRoute;