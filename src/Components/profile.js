import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';

function Profile() {
  /*const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, like sending data to the backend
    alert('Profile updated successfully!');
  };*/

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        {/*<form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="file" 
              className="form-control" 
              id="profilePicture" 
              onChange={handleProfilePictureChange} 
              accept="image/*" 
            />
            {profilePicture && (
              <div className="mt-3">
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="img-fluid rounded-circle" 
                  style={{ width: '150px', height: '150px' }} 
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </div>
        </form>*/}
      </div>
      <Footer/>
    </div>
  );
}

export default Profile;
