import { Link } from "react-router-dom"

const Navbar = () => {
    return <nav>
        <Link to='/'>HOME</Link>
        <Link to='/users'>USERS</Link>
    </nav>
}

export default Navbar