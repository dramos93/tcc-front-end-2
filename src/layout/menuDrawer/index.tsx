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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MainRoutes from '../../routes/MainRoutes';
import { pathToRole, PathObject, childrenType } from '../../routes/MainRoutes';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../hooks/useAuth';

enum TypeUser {
    'admin' = 1,
    'student' = 2
}

const drawerWidth = 240;
export const getKeys = (role: TypeUser | string | null) => {
    return pathToRole.filter(item => item.roles.includes(role));
};

const getItems = (keys: Array<PathObject>): Array<childrenType> | undefined => {
    return MainRoutes.children?.filter(x => keys?.some(y => {
        return y.key === x.key && x;
    }));
};


export default function MenuDrawer() {
    const { pathname } = useLocation();
    const { roleUser, setToken, logout } = React.useContext(AuthContext);



    const keys = getKeys(roleUser);
    const items = getItems(keys);
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
                    {items?.map((item, index) => (
                        <ListItem
                            key={item.key}
                            disablePadding
                        >
                            <ListItemButton
                                selected={item.path === pathname}
                                component={React.forwardRef((props, ref) => <Link {...props} to={item.path} />)
                                }>
                                <ListItemIcon>
                                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['SAIR'].map((item, index) => (
                        <ListItem key={item} disablePadding>
                            <ListItemButton 
                            onClick={logout}
                            >
                                <ListItemIcon>
                                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}