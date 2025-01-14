import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('John Doe');
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
  };

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <p className="lead">Update your profile details below:</p>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Section */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
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

        {/* Name Section */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        {/* Email Section */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        {/* Submit Button */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
