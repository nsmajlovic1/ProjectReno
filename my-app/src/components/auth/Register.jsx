import { StyledForm } from "./StyledForm";

const Register = () => {
    return ( <>
    <StyledForm>
        <h2>Register</h2>
        <input type="text" placeholder="name"></input>
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button>Register</button>
    </StyledForm>
    </> );
}
 
export default Register;