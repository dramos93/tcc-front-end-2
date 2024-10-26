// import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocalStorage } from "./useLocalStorage";

// export interface UserToken {
//     token: string;
// }

// interface PropsAuthProvider {
//     children: React.ReactNode;
// }

// export enum TypeUser {
//     'admin' = 1,
//     'student' = 2
// }

// export interface UserInterface {
//     id: number;
//     name: string;
//     email: string;
//     role: TypeUser;
//     username: string;
// }

// interface AuthContextType {
//     user: UserInterface;
//     // login: (data: UserToken) => void;
//     // logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const getDataFromUser = (userToken: UserToken): UserInterface => {
//     alert("entrou");
//     alert(`Com o token ${userToken.token} pega os dados do usuário`);
//     return {
//         username: "Daniel",
//         email: "daniel.silvaramos.93@gmail.com",
//         id: 1,
//         name: "Daniel",
//         role: TypeUser.admin,
//     };
// };

// export const AuthProvider = ({ children }: PropsAuthProvider) => {
//     const [userToken, setUserToken] = useLocalStorage("user_token", "");
//     const [user, setUser] = useState({} as UserInterface);
    
//     const navigate = useNavigate();

//     // Verificar se tem token no localStorage
//     if (userToken) {
//         alert("Tem token.")

//     } else{
//         alert("Não tem token.")
//         navigate('/login', { replace: true })
//         alert("deveria trocar de rota")
//     }

//     // alert("entrou 1");
//     // const getData = useCallback(() => {
//     //     const url = 'http://127.0.0.1:5000/auth';
//     //     const init = {
//     //         method: 'GET',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             'token': userToken
//     //         }
//     //     } as RequestInit;
        
//     //     // fetch(url, init)
//     //     // .then(res => {
//     //     //     if (!res.ok) {
//     //     //         throw new Error('Erro na requisição');
//     //     //     }
//     //     //     return res.json();
//     //     // })
//     //     // .then(data => {
//     //     //     setUser(data as UserInterface);
//     //     // })
//     //     // .catch(error => {
//     //     //     alert('Erro:', error);
//     //     // });
//     //     console.log("pegando dado da api.")
//     // }, [setUser, userToken]);
//     // alert("entrou 2")

//     // const login = useCallback((data: UserToken) => {
//     //     setUserToken(data.token);
//     //     getData();
//     //     // navigate("/", { replace: true });
//     // }, [setUserToken, navigate, getData]);

//     // const logout = useCallback(() => {
//     //     setUserToken("");
//     //     setUser({} as UserInterface);
//     //     // navigate("/login", { replace: true });
//     // }, [setUserToken, setUser, navigate]);

//     // useEffect(() => {
//     //     if (userToken) {
//     //         getData();
//     //     }
//     // }, [userToken, getData]);

//     const value = useMemo(
//         () => ({
//             user,
//             // login,
//             // logout
//         }),
//         [
//             user,
//             // login,
//             // logout
//         ]
//     );

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
