import { createContext, useEffect, useMemo, useState } from 'react';
import { getAuth } from '../routes/CheckAuth';
import { authTokenAPI } from '../services/api';
import { LogoutAuth } from '../routes/CheckAuth';

interface AuthContext {
    token: string | null;
    isAuthenticated: boolean | null;
    setAthenticated: (isAuthenticated: boolean | null) => void;
    setToken: (token: string | null) => void;
    roleUser: string | null;
    classUser: number | null;
    userId: number | null;
    userName: string | null;
    logout: () => void;
    setUserId: (userId: number | null) => void
    setUserName: (userName: string | null) => void
    setRoleUser: (roleUser: string | null) => void
    setClassUser: (classUser: number | null) => void
}

const AuthContext = createContext<AuthContext>({
    token: null as string | null,
    setToken: (token: string | null) => token,
    isAuthenticated: null as boolean | null,
    setAthenticated: (isAuthenticated) => { },
    roleUser: null as string | null,
    classUser: null as number | null,
    userId: null as number | null,
    userName: null as string | null,
    logout: () => { },
    setUserId: (userId: number | null) => { },
    setUserName: (userName: string | null) => { },
    setRoleUser: (roleUser: string | null) => { },
    setClassUser: (classUser: number | null) => { },

});

function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [roleUser, setRoleUser] = useState<string | null>(null);
    const [classUser, setClassUser] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    const logout = () => {
        LogoutAuth();
        setToken("");
    };

    const getAuthMemo = useMemo(async () => {
        return await getAuth();
    }, [loading]);

    const checkAuthMemo = useMemo(async () => {
        const check = await authTokenAPI();
        if (!check.token) {
            setToken("");
        }
        setRoleUser(check.user_role as string);
        setClassUser(check.class_id as number);
        setUserId(check.user_id as number);
        setUserName(check.user_name as string);
        return check.token;
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
        <AuthContext.Provider value={{
            setRoleUser,
            setClassUser,
            setUserId,
            setUserName,
            logout,
            token,
            setToken,
            isAuthenticated,
            setAthenticated: setIsAuthenticated,
            roleUser,
            classUser,
            userId,
            userName
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };