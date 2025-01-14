import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const jobs = [
  { id: 1, title: 'Farm Hand Needed', location: 'Rural Area', description: 'Help with harvesting crops' },
  { id: 2, title: 'Tractor Operator', location: 'Farm A', description: 'Operate farm machinery' },
  
];

function JobListings() {
  const styles = {
    jobList: {
      listStyleType: 'none',
      padding: 0,
    },
    jobItem: {
      border: '2px #56657c solid',
      padding: '15px',
      margin: '20px 100px',
    },
    jobLink: {
      textDecoration: 'none',
      color: '#56657c',
      fontWeight: 'normal',
      fontSize: '14px',
    },
    location: {
      display: 'block',
      fontSize: '0.9em',
      color: '#555',
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <Navbar />
        <div className="Jobs">
          <ul className="JobList" style={styles.jobList}>
            {jobs.map(job => (
              <li key={job.id} style={styles.jobItem}>
                <Link to={`/job/${job.id}`} style={styles.jobLink}>
                  {job.title}
                  <span style={styles.location}>{job.location}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div> 
      <Footer/>
    </div>  
  );
}

export default JobListings;
