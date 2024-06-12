import React, { useState } from "react";
import { useAuth, UserToken } from "../../hooks/useAuth";
import { TextField, InputAdornment, IconButton, Button, Grid, Paper, Container, CssBaseline } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState({} as UserToken);

    function post(url: string, init: RequestInit): Promise<Response> {
        alert("entramos.");
        return fetch(url, init).catch(error => {
            console.log('Erro:', error);
            throw error;
        });
    }

    const handleClick = async () => {
        interface AuthResponse {
            token: string;
            [key: string]: any;
        }

        async function authAPI(username: string, password: string): Promise<AuthResponse> {
            let auth = { user_nickname: username, user_password: password };
            const url = 'http://127.0.0.1:5000/auth';
            const init: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(auth)
            };

            try {
                console.log('Sending request to:', url);
                const res = await fetch(url, init);

                if (res.ok) {
                    const data: AuthResponse = await res.json();
                    console.log('Response data:', data);
                    alert('Request succeeded.');
                    setToken({ token: data.token });
                    return data;
                } else {
                    console.error('Response status not OK:', res.status);
                    const errorData: AuthResponse = await res.json();
                    console.log('Response error data:', errorData);
                    alert('Request failed with status ' + res.status);
                    return errorData;
                }
            } catch (error) {
                // console.error('Fetch error:', error.message, error.stack);
                console.log(error)
                alert('Catch, request error: ');
                throw error;
            }
        }

        // Função para definir o token (ajuste conforme necessário)
        function setToken(token: { token: string | undefined; }) {
            // Exemplo de armazenamento do token no localStorage
            localStorage.setItem('authToken', token.token || '');
        }

        // Chamando a função authAPI com username e password
        await authAPI(username, password);


        alert(token);
        login(token);
    };

    return (
        <>
            <CssBaseline />
            <Container fixed >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Paper elevation={6}>
                        <form onSubmit={handleClick}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                                sx={{
                                    minHeight: 250,
                                    width: 400,
                                }}>
                                <Grid container
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                        minHeight: 100,
                                        width: 250,
                                    }}>

                                    <TextField name="user" label="Usuário" size='small' onChange={x => setUsername(x.target.value)} fullWidth />
                                    <TextField name="password" label="Senha" size='small' fullWidth
                                        onChange={e => setPassword(e.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(p => !p)} edge="end" >
                                                        {!showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Button size="large" type="submit" variant="contained" >
                                    Login
                                </Button >
                                <input>{ }</input>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container >
        </>
    );
};

export default Login;