import Home from '../pages/home';
import Users from '../pages/users';
import MainLayout from '../layout/MainLayout';


const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/users",
            element: <Users />
        }
    ]
}

export default MainRoutes