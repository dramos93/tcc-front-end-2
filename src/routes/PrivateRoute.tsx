import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/login";

interface PrivateRouteProps {
    children: React.ReactElement;
    CheckAuth: () => Promise<boolean>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, CheckAuth }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const FetchAPI = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/auth");
            console.log(response);
            const data = await response.json();
            return true;
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Erro desconhecido');
            return false;
        }
    };

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await FetchAPI();
                const authResult = await CheckAuth();
                setIsAuthenticated(authResult);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        verifyAuth();
    }, [CheckAuth]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1>Carregando...</h1>
            </div>
        );
    }

    // Se estiver na rota de login e já estiver autenticado, redireciona para home
    if (location.pathname === "/login" && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    // Se estiver na rota de login e não estiver autenticado, mostra o login
    if (location.pathname === "/login") {
        return <Login />;
    }

    // Para todas as outras rotas, verifica autenticação
    if (!isAuthenticated) {
        // Salva a rota que o usuário tentou acessar para redirecionar depois do login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;