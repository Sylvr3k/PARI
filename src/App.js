import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./Components/signin";
import Register from "./Components/register";
import JobListings from "./Components/joblisting";
import Farmers from "./Components/farmers";
import Dashboard from "./Components/dashboard";
import Profile from "./Components/profile";
import ProtectedRoute from "./Components/protected";
import API_BASE_URL from "./config"; // Import the centralized URL

const App = () => {
  const [jobListings, setJobListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/job-listings`) // Example: use your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job listings');
        }
        return response.json();
      })
      .then(data => {
        setJobListings(data); // Assuming data is an array of job listings
      })
      .catch(err => {
        console.error('Error fetching job listings:', err);
        setError(err.message);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route 
          path="/JobListings" 
          element={<JobListings jobListings={jobListings} error={error} />} 
        />
                <Route element={<ProtectedRoute />}>
                    <Route path="/farmers" element={<Farmers />} />
                </Route>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
