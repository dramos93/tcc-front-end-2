import React from "react"
import { useAuth } from "../../hooks/useAuth";
import { Box, Stack, TextField, InputAdornment, IconButton, Button, Grid, Paper, Container, CssBaseline } from "@mui/material";

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
                    <Paper elevation={12}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"
                            sx={{
                                minHeight: '250px',
                                width: 400,
                            }}>
                            <TextField name="user" label="Usuário" />
                            <TextField name="password" label="Senha"
                            // type={showPassword ? 'text' : 'password'}
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment position="end">
                            //             <IconButton onClick={() => alert('Hello!')} edge="end">
                            //                 <Iconify icon={true ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            //             </IconButton>
                            //         </InputAdornment>
                            //     ),
                            // }}
                            />
                            <Button size="large" type="submit" variant="contained" onClick={handleClick}>
                                Login
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Container >
        </>
    )
}

export default Login