import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

function Farmers() {
  const farmersData = [
    { id: 1, name: 'Jane Doe', farmName: 'Green Acres', location: 'Kigoma, Tanzania' },
    { id: 2, name: 'John Smith', farmName: 'Sunny Hills', location: 'Morogoro, Tanzania' },
    { id: 3, name: 'Sarah Brown', farmName: 'Mountain View', location: 'Dodoma, Tanzania' },
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
                <h6 className="card-subtitle mb-2 text-muted">{farmer.farmName}</h6>
                <p className="card-text">{farmer.location}</p>
                <a href="#" className="card-link">View Details</a>
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
