import React from "react"
import { useAuth } from "../../hooks/useAuth";
import { Box, Stack, TextField, InputAdornment, IconButton, Button, Grid, Paper, Container } from "@mui/material";

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
        <Grid container style={{
            // display: 'inline-flex',
            // position: 'absolute',
            // height: '100vh',

        }}
        >
            {/* <Grid container style={{ position: 'absolute' }}> */}
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: 'goldenrod',
                    // display: 'flex',
                    // height: 'vw',
                    // heig

                }}
            // spacing={5}
            >
                <TextField name="user" label="Username" />
                <TextField
                    name="password"
                    label="Senha"
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
                {/* <Paper sx={{ width: 100, height: 100, backgroundColor: 'blue' }} /> */}
            </Grid>
            {/* </Grid> */}
        </Grid>
    )
}

export default Login