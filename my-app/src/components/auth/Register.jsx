import { StyledForm } from "./StyledForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
        
    const onButtonClick = () => {
       // Set initial error values to empty
       setNameError("")
       setEmailError("")
       setUsernameError("")
       setPasswordError("")

       // Check if the user has entered fields correctly
       if ("" === name) {
            setNameError("Please enter your name")
            return
       }

       if ("" === email) {
            setEmailError("Please enter your email")
            return
       }

       if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
       }
       
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
            // If yes, user already exists 
            if (accountExists)
                setErrorMessage("User already exists");
            else
            {
                registerNewUser()
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
const registerNewUser = () => {
    fetch("http://localhost:3080/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({name, email, username, password})
    })
    .then(r => r.json())
    .then(r => {
        if ('success' === r.message) {
            localStorage.setItem("user", JSON.stringify({username, token: r.token}))
            props.setLoggedIn(true)
            props.setUsername(username)
            navigate("/")
        } else {
            setErrorMessage("Error creating a new account");
        }
    })
} 
    
    
    
    return ( <>
    <StyledForm>
        <h2>Register</h2>
        
        <input 
            type="text" 
            placeholder="name"
            onChange={ev => setName(ev.target.value)}
        />
        <label className="errorLabel">{nameError}</label>

        <input 
            type="text" 
            placeholder="email"
            onChange={ev => setEmail(ev.target.value)}
        />
        <label className="errorLabel">{emailError}</label>

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
            Register
        </button>
        <label className="errorLabel">{errorMessage}</label>
        
        

    </StyledForm>
    </> );
}
 
export default Register;