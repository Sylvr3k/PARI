import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

function Dashboard() {
  return (
    <div>
    <Navbar/>  
    {/*<div className="container mt-5">

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Earnings</h5>
              <p className="card-text">$2,500</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Tasks Completed</h5>
              <p className="card-text">47 Tasks</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Profile Views</h5>
              <p className="card-text">1,250 Views</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4>Recent Activities</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 12, 2025</td>
              <td>Completed Task #1001</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Jan 11, 2025</td>
              <td>Profile Updated</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>Jan 10, 2025</td>
              <td>New Project Assigned</td>
              <td>In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>*/}
    <Footer/>
    </div>
  );
}

export default Dashboard;
