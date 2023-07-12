import { useAuth } from "../../hooks/useAuth";

function Users() {
    const { user } = useAuth();
    // const user = useContext(LoginContext)

    return (
        <>
            <h1>Nome do usuário: {user!.name}</h1>
            <h1>Login: {user!.email}</h1>
        </>
    )
}

export default Users