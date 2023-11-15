import { Link } from "react-router-dom";
import RenoLogo from "../images/renologo.png"
import styled from "styled-components";
const Navbar = () => {
    return ( 
    <nav className = "nav-bar">
        <Link to="/">
            <h2>renohome</h2>
        </Link>
        <div className="reno-home">
            <img src={RenoLogo} alt="Renologo" />
        </div>
        <AuthLinks>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </AuthLinks>
    </nav>);
}
 
export default Navbar;

const AuthLinks = styled.div`
   a{
    &:last-child{
        margin-right: 2rem;
    }
    &:first-child{
        margin-right: 2rem;
    }
   } 
`