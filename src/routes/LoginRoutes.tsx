import LoginLayout from "../layout/LoginLayout"
import Login from "../pages/login"


const LoginRoutes = {
    path: '/',
    element: <LoginLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        }
    ]
}

export default LoginRoutes