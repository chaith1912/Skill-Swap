import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Need token for API call

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // We need to send our token to access this protected route
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        
        // Call your new admin-only endpoint
        const { data } = await axios.get('http://localhost:5000/api/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
        setError(error.response?.data?.message || 'Failed to fetch users');
      }
      setLoading(false);
    };
    
    fetchUsers();
  }, [token]);

  if (loading) return <div className="container"><p>Loading users...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;

  return (
    <div className="skill-list-container"> {/* Reuse existing styles */}
      <h2>Admin Panel: All Users ({users.length})</h2>
      <div className="form-container"> {/* Reuse existing styles */}
        {users.map(user => (
          <div key={user._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
            <p><strong>ID:</strong> {user._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;