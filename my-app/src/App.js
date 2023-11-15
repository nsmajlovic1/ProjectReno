import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Fetch the username and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/username does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
            method: "POST",
            headers: {
                'jwt-token': user.token
              }
        })
        .then(r => r.json())
        .then(r => {
            setLoggedIn('success' === r.message)
            setUsername(user.username || "")
        })
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/not-found" element={<NotFound />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}/>
        <Route path="/" exact element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="*" element={<Navigate to="not-found" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
