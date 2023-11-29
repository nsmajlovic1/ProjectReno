import { Link } from "react-router-dom";
import RenoLogo from "../images/renologo.png"
import styled from "styled-components";
import{useNavigate} from "react-router-dom"
const Navbar = ({ loggedIn, handleLogout }) => {
    const navigate = useNavigate()
    console.log(loggedIn)
    console.log(loggedIn);
    return ( <>
    <nav className = "nav-bar">
        <Link to="/">
            <h2>reno</h2>
        </Link>
        
            {loggedIn ? (
            <Links>
                <Link to="/admin/overview">Admin</Link>
                <LogoutButton onClick={() => { navigate("/"); handleLogout(); }}>Logout</LogoutButton>
            </Links>
            ) : (
            <AuthLinks>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </AuthLinks>
            )}
        
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
    font-weight: bold;
`

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 2rem;
  font-weight: bold;

`
const Links = styled.div`
  display:flex;
  color: white;
  font-weight: bold;
  cursor: pointer;
  a{
    &:first-child{
        margin-right: 2rem;
    }
  }
   
`