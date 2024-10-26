import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/login";

interface PrivateRouteProps {
    children: React.ReactElement;
    CheckAuth: () => Promise<boolean>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, CheckAuth }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        const verifyAuth = async () => {
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