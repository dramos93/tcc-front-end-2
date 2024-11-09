import React, { Suspense, useContext, useState } from "react";
import { TextField, InputAdornment, IconButton, Button, Grid, Paper, Container, CssBaseline } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useLocation, json } from "react-router-dom";
import { AuthContext } from "../../hooks/useAuth";
import { getTokenAPI } from "../../services/api";
import { setLocalStorage } from "../../routes/CheckAuth";


const Login = () => {
    const { setToken, token } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [disableButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabledButton(true);
        const tokenFromAPI = await getTokenAPI(username, password);
        setToken(tokenFromAPI.token);
        setLocalStorage(tokenFromAPI.token);
        setDisabledButton(false);
        if (token) navigate(location.pathname);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CssBaseline />
            <Container fixed >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Paper elevation={6}>
                        <form
                            id="form-login"
                            onSubmit={handleClick}
                        >
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
                                <Button size="large" type="submit" variant="contained" disabled={disableButton}>
                                    Login
                                </Button >
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container >
        </Suspense>
    );
};

export default Login;