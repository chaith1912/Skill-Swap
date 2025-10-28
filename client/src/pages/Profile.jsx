import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx'; // Use our auth hook

const Profile = () => {
  const { token } = useAuth(); // Get the token from our auth context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // We must send the token in the headers for the 'protect' middleware to see it
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // <-- This is how the backend gets the token
        },
      };

      try {
        const res = await axios.get(
          'http://localhost:5000/api/users/profile',
          config
        );
        setUser(res.data);
      } catch (err) {
        setError(err.response.data.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('You must be logged in to view this page.');
    }
  }, [token]); // Re-run if the token changes

  if (loading) {
    return <div>Loading...</div>;
  }

  // Use the same .form-container class for consistent styling
  return (
    <div className="form-container"> 
      <h2>My Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user._id}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;