import { StyledForm } from "./StyledForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
       // Set initial error values to empty
       setUsernameError("")
       setPasswordError("")

       // Check if the user has entered both fields correctly
       if ("" === username) {
           setUsernameError("Please enter your username")
           return
       }

       if (!/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
           setUsernameError("Please enter a valid username")
           return
       }

       if ("" === password) {
           setPasswordError("Please enter a password")
           return
       }

       if (password.length < 7) {
           setPasswordError("The password must be 8 characters or longer")
           return
       }

        // Check if username has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            if (window.confirm("An account does not exist with this username: " + username + ". Do you want to create a new account?")) {
                logIn()
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
    fetch("http://localhost:3080/auth", {
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
            props.setLoggedIn(true)
            props.setUsername(username)
            navigate("/")
        } else {
            window.alert("Wrong username or password")
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
        <label className="errorLabel">{usernameError}</label>
        
        
        <input 
            type="password" 
            placeholder="password"
            onChange={ev => setPassword(ev.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>
        
        <button
        type="button"
        onClick={onButtonClick}>
            Login
        </button>
    </StyledForm>
     );
}
 
export default Login;