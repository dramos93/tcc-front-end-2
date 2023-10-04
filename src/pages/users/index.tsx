import { useAuth } from "../../hooks/useAuth";

function Users() {
    const { user } = useAuth();
    return (
        <>
            <h1>Username: {user!.username}</h1>
            <h1>Tipo de Usuário: {user!.role}</h1>
        </>
    )
}

export default Users