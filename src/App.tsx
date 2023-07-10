import './App.css';
import { Outlet } from 'react-router';
import MenuAppBar from './layout/menuAppBar';
import MenuDrawer from './layout/menuDrawer';
import { Box, Toolbar } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <MenuAppBar />
      <MenuDrawer />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
