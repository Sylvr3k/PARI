import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function Farmers() {
  const farmersData = [
    { id: 1, name: 'Jane Doe', location: 'Kigoma, Tanzania' },
    { id: 2, name: 'John Smith', location: 'Morogoro, Tanzania' },
    { id: 3, name: 'Sarah Brown', location: 'Dodoma, Tanzania' },
  ];

  return (
   <div className="growth">
    <Navbar/>
    <div className="container mt-5">
      <div className="row">
        {farmersData.map((farmer) => (
          <div className="col-md-4" key={farmer.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{farmer.name}</h5>
                <p className="card-text">{farmer.location}</p>
                <Link href="#" className="card-link">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
   </div>  
  );
}

export default Farmers;
