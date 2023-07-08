import { Link } from 'react-router-dom';
import './App.css';

// Reaproveitamento de estrutura;
import { Outlet } from 'react-router';
import MenuAppBar from './pages/menuAppBar';
import MenuDrawer from './pages/menuDrawer';
import { Box, Toolbar } from '@mui/material';


function App() {
  return (
    <>
      <MenuAppBar />
      <MenuDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
