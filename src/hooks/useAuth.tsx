import { createContext, useEffect, useMemo, useState } from 'react';
import { getAuth } from '../routes/CheckAuth';
import { authTokenAPI } from '../services/api';

interface AuthContext {
    token: string | null;
    isAuthenticated: boolean | null;
    setAthenticated: (isAuthenticated: boolean | null) => void;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContext>({
    token: null as string | null,
    setToken: (token: string | null) => token,
    isAuthenticated: null as boolean | null,
    setAthenticated: (isAuthenticated) => { },

});

function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    const getAuthMemo = useMemo(async () => {
        return await getAuth();
    }, [loading]);

    const checkAuthMemo = useMemo(async () => {
        const check =  await authTokenAPI();
        if (!check) {
            setToken("")
        }
        return check;
    }, [loading]);


    useEffect(() => {
        const auth = async () => {
            setToken(await getAuthMemo);
            const check = await checkAuthMemo;
            setIsAuthenticated(check);
            return loading;
        };
        if (loading) {
            auth();
            setLoading(false);

        }
    }, []);


    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, setAthenticated: setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };