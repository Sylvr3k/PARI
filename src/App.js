import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./Components/signin";
import Register from "./Components/register";
import JobListings from "./Components/joblisting";
import Farmers from "./Components/farmers";
import Dashboard from "./Components/dashboard";
import Profile from "./Components/profile";

const App = () => {
  return(
    <Router>   
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/JobListings" element={<JobListings />} />
          <Route path="/Farmers" element={<Farmers />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
    </Router>
    )
}

export default App;