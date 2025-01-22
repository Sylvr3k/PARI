import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function JobListings({ jobListings, error }) {
  const styles = {
    jobList: {
      listStyleType: 'none',
      padding: 0,
    },
    jobItem: {
      backgroundColor: '#56657c',
      color: '#fff',
      padding: '25px 25px 25px 25px',
      margin: '20px 100px',
    },
    jobLink: {
      textDecoration: 'none',
      color: '#56657c',
      fontWeight: 'normal',
      fontSize: '13px',
    },
    location: {
      display: 'block',
      fontSize: '0.9em',
      color: '#fff',
      marginTop: '2px',
      marginBottom: '10px',
      fontWeight: '100',
    },
    viewBtn: {
      color: '#7a91b4',
      textDecoration: 'none',
      fontSize: '13px',
      marginTop: '30px',
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobListings || jobListings.length === 0) {
    return <div>No job listings available</div>;
  }

  return (
    <div>
      <div style={styles.container}>
        <Navbar />
        <div className="Jobs">
          <ul className="JobList" style={styles.jobList}>
            {jobListings.map((job) => (
              <Link to={`/job/${job.id}`} style={styles.jobLink} key={job.id}>
                <li style={styles.jobItem}>
                  <span style={styles.title}>{job.title}</span>
                  <span style={styles.location}>{job.location}</span>
                  <Link style={styles.viewBtn} to="#">View Details</Link>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div> 
      <Footer />
    </div>  
  );
}

export default JobListings;
