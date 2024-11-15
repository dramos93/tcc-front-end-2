import React from "react";
import { useAuth, UserToken } from "../../hooks/useAuth";
import { TextField, InputAdornment, IconButton, Button, Grid, Paper, Container, CssBaseline } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClick = () => {

        //Fazer autenticação na API
        function authAPI(username: string, password: string): UserToken {

            // faz a requisição de login, retornando o token.
            console.log(`Fez a requisição. Usuário: ${username} e senha: ${password}`);

            return {
                token: "123456"
            };
        }



        const returnUserAPI = authAPI(username, password);

        //Aqui guarda as informações que vem da API.
        login(returnUserAPI);
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