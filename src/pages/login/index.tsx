import React from "react"
import { useAuth, User, TypeUser } from "../../hooks/useAuth";
import { TextField, InputAdornment, IconButton, Button, Grid, Paper, Container, CssBaseline } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
    const [username, setUsername] = React.useState('')
    const { login } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClick = () => {

        //Fazer autenticação na API
        function authAPI(): User {
            return {
                username: username,
                email: "",
                id: 1,
                name: "",
                token: "",
                type: TypeUser.student,
            }
        }

        const returnUserAPI = authAPI()

        //Aqui guarda as informações que vem da API.
        login(returnUserAPI);
    }

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
                            <Button size="large" type="submit" variant="contained" onClick={handleClick}>
                                Login
                            </Button>
                            <input>{ }</input>
                        </Grid>
                    </Paper>
                </Grid>
            </Container >
        </>
    )
}

export default Login