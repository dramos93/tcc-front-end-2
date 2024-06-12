import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";



export interface UserToken {
    token: string;
    // user_id: string,
    // created_on: string,
    // active: string,
    // user_name: string,
    // user_nickname: string,
    // user_role: string,
}

interface PropsAuthProvider {
    children: React.ReactNode; // Ou o tipo apropriado para as crianças (children) do componente.
}

export enum TypeUser {
    'admin' = 1,
    'student' = 2
}

export interface UserInterface {
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
    user: UserInterface;
    login: (data: UserToken) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const getDataFromUser = (userToken: UserToken): UserInterface => {
    console.log('get from user: ' + userToken.token);
    // console.log((userToken.token === '') ? '{}' : 'getData(userToken.token)');
    // const data = userToken.token ? getData(userToken.token) : {};

    // const [data, setData] = useState({} as UserToken)
    // console.log(getData(userToken));

    console.log(userToken.token);
    console.log(`Com o token ${userToken.token} pega os dados do usuário`);
    return {
        username: "Daniel",
        email: "daniel.silvaramos.93@gmail.com",
        id: 1,
        name: "Daniel",
        role: TypeUser.admin,
    };
};

export const AuthProvider = ({ children }: PropsAuthProvider) => {
    const [userToken, setUserToken] = useLocalStorage("user_token", "");
    // const [user, setUser] = useState(getDataFromUser(userToken));
    const [user, setUser] = useState({} as UserInterface);
    const getData = useCallback(() => {
        const url = 'http://127.0.0.1:5000/auth';
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            }
        } as RequestInit;
        fetch(url, init).then(res => {
            if (!res.ok) {
                throw new Error('Erro na requisição');
            } else {
                return res.json();
            }
        }).then(data => {
            setUser(data as UserInterface);
        }).catch(error => {
            console.log('Erro:', error);
            throw error;
        });
    }, [setUser, userToken]);
    const navigate = useNavigate();
    const login = useCallback((data: UserToken) => {
        console.log(data);
        setUserToken(data.token);
        getData();
        // setUser(getDataFromUser(userToken));
        navigate("/", { replace: true });
    }, [setUserToken, navigate, getData]);

    const logout = useCallback(() => {
        setUserToken("");
        setUser({} as UserInterface);
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

    // useEffect(() => {

    //     setUser(getDataFromUser(userToken));
    // });

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
