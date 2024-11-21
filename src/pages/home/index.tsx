import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';

const Home = () => {
    const {userName} = useContext(AuthContext);
    return (
        <h1>
            Seja bem-vindo, {userName}!
        </h1>
    )

}

export default Home;