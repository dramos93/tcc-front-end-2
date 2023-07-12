import React from "react"
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
    const [word, setWord] = React.useState('')

    const { login } = useAuth();


    const handleClick = () => {
        login({
            email: word,
            id: 0,
            name: ""
        });

    }
    return <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'GrayText' }}>
            <input onChange={value => setWord(value.target.value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>{word}</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleClick}>LOGIN</button>
        </div>
    </div>
}

export default Login