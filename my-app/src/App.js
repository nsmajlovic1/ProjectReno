import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { useEffect, useState } from 'react';
import Dashboard from './components/admin/Dashboard';
import Overview from './components/admin/Overview';
import Proposals from './components/admin/Proposals';
import CreateProposal from './components/admin/CreateProposal';
import CreateMilestone from './components/admin/CreateMilestone';
import AddBudget from './components/admin/AddBudget';

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
          if ('success' === r.message) {
            setLoggedIn(true);
            setUsername(user.username || "");
          } else {
            // Token verification failed; mark the user as logged out
            setLoggedIn(false);
          }
        })
    
  }, [])
  
  const handleLogout = () => {
    // Clear user data from local storage and mark the user as logged out
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUsername("");
    
  };

  

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/not-found" element={<NotFound />}/>
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setUsername={setUsername} />}/>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="proposals" element={<Proposals />}/>
          <Route path="create-proposal" element={<CreateProposal />} />
          <Route path="create-milestone/:proposalId" element={<CreateMilestone />} />
          <Route path="add-budget" element={<AddBudget />} />
          <Route path="overview" element={<Overview />}/>
        </Route>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}/>
        <Route path="/" exact element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="*" element={<Navigate to="not-found" />}/>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
