import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../hooks/useAuth';

export default function MenuAppBar() {
    const { userName } = React.useContext(AuthContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GAME
                    </Typography>
                    <Typography variant="inherit" component="div"
                    >
                        {`Olá, ${userName}`}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}