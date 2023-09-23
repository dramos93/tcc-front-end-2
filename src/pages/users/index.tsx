import { useAuth } from "../../hooks/useAuth";

function Users() {
    const { user } = useAuth();
    // const user = useContext(LoginContext)
    console.log(user)
    return (
        <>
            <h1>Username: {user!.username}</h1>
            <h1>Tipo de Usuário: {user!.type}</h1>
        </>
    )
}

export default Users