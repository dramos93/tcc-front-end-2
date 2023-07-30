import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 240;

export default function MenuDrawer() {
    const { pathname } = useLocation();
    const { logout } = useAuth();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 1,
            }}
            open={true}
        >
            <Toolbar />
            <Box component="nav" sx={{ overflow: 'auto' }}>
                <List>
                    {[{ page: 'Página Inicial', link: '/' }, { page: 'Usuários', link: '/users' }].map((text, index) => (
                        <ListItem
                            key={text.page}
                            disablePadding
                        >
                            <ListItemButton
                                selected={text.link === pathname}
                                component={React.forwardRef((props, ref) => <Link {...props} to={text.link} />)
                                }>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text.page} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['SAIR'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}