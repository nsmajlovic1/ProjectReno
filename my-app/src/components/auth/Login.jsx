import { StyledForm } from "./StyledForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        setErrorMessage("")

        // Check if username has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            {
                setErrorMessage("Wrong username or password");
            }  
        })
    }

   // Call the server API to check if the given username ID already exists
   const checkAccountExists = (callback) => {
    fetch("http://localhost:3080/check-account", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({username})
    })
    .then(r => r.json())
    .then(r => {
        callback(r?.userExists)
    })
}

// Log in a user using username and password
const logIn = () => {
    fetch("http://localhost:3080/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({username, password})
    })
    .then(r => r.json())
    .then(r => {
        if ('success' === r.message) {
            localStorage.setItem("user", JSON.stringify({username, token: r.token}))
            
            
            // Fetch the user's role after login
            fetch("http://localhost:3080/get-role", {
                method: "POST",
                headers: {
                    'jwt-token': r.token
                },
            })
            .then(roleResponse => roleResponse.json())
            .then(roleData => {
                props.setLoggedIn(true)
                props.setUsername(username)
                
                if (roleData.role === "admin") {
                    navigate("/admin/overview");
                } else {
                    navigate("/");
                }
            });
        } else {
            setErrorMessage("Wrong username or password");
        }
    })
} 

    return ( 
    <StyledForm>
        <h2>Login</h2>
        
        <input 
            type="text" 
            placeholder="username"
            onChange={ev => setUsername(ev.target.value)}
        />
        
        
        
        <input 
            type="password" 
            placeholder="password"
            onChange={ev => setPassword(ev.target.value)}
        />
        
        
        <button
        type="button"
        onClick={onButtonClick}>
            Login
        </button>
        <label className="errorLabel">{errorMessage}</label>
        
        

    </StyledForm>
     );
}
 
export default Login;