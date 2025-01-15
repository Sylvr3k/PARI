import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div>
         <nav className="navbar navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src="monoleg.png" height="45px" width="45px" alt="Icon Mono"/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link id="job" to="/JobListings" aria-current="page" href="#">Job Listings</Link>
                <Link id="farmers" to="/Farmers">Farmers</Link>
                <Link id="dash" to="/Dashboard">Dashboard</Link>
                <Link id="profile" to="/Profile">Profile</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
  );
}

export default Navbar;