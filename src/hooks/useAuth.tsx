import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface Props {
    children?: React.ReactNode;
}

interface User {
    // Define a estrutura do objeto de usuário
    // com base nos dados que serão armazenados
    // em localStorage
    // Por exemplo:
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (data: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data: any) => {
        setUser(data);
        navigate("/", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
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
