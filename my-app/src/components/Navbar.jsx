import { Link } from "react-router-dom";
import RenoLogo from "../images/renologo.png"
import styled from "styled-components";
const Navbar = ({ loggedIn, handleLogout }) => {
    console.log(loggedIn)
    console.log(loggedIn);
    return ( <>
    <nav className = "nav-bar">
        <Link to="/">
            <h2>renohome</h2>
        </Link>
        <AuthLinks>
            {loggedIn ? (
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
            )}
        </AuthLinks>
    </nav>
    
    <div className="reno-home">
        <img src={RenoLogo} alt="Renologo" />
    </div></>
    );
    
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

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 2rem;
`