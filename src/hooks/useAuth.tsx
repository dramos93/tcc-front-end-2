import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export interface UserToken {
    token?: string;
}

interface PropsAuthProvider {
    children: React.ReactNode; // Ou o tipo apropriado para as crianças (children) do componente.
}

export enum TypeUser {
    'admin' = 1,
    'student' = 2
}

export interface User {
    // Define a estrutura do objeto de usuário
    // com base nos dados que serão armazenados
    // em localStorage
    // Por exemplo:
    id: number;
    name: string;
    email: string;
    role: TypeUser;
    username: string;
}

interface AuthContextType {
    user: User;
    login: (data: UserToken) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsAuthProvider) => {
    const [userToken, setUserToken] = useLocalStorage("user_token", "");
    const getDataFromUser = (userToken: UserToken): User => {
        console.log(`Com o token ${userToken.token} pega os dados do usuário`);
        return {
            username: "Daniel",
            email: "daniel.silvaramos.93@gmail.com",
            id: 1,
            name: "Daniel",
            role: TypeUser.admin,
        };
    };
    const [user, setUser] = useState(getDataFromUser(userToken));
    const navigate = useNavigate();


    const login = useCallback((data: UserToken) => {
        console.log(data);
        setUserToken(data.token);
        setUser(getDataFromUser(userToken));
        navigate("/", { replace: true });
    }, [userToken, setUserToken, setUser, navigate]);

    const logout = useCallback(() => {
        setUserToken("");
        setUser({} as User);
        navigate("/login", { replace: true });
    }, [setUserToken, setUser, navigate]);

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
