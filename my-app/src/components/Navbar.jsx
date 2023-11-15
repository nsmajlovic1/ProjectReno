import { Link } from "react-router-dom";
import RenoLogo from "../images/renologo.png"
const Navbar = () => {
    return ( 
    <nav className = "nav-bar">
        <Link to="/">
            <h2>renohome</h2>
        </Link>
        <div className="reno-home">
            <img src={RenoLogo} />
        </div>
    </nav>);
}
 
export default Navbar;