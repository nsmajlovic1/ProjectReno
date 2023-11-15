import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/not-found" element={<NotFound />}/>
        <Route path="/" exact element={<Home />}/>
        <Route path="*" element={<Navigate to="not-found" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
