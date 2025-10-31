// 1. Import 'useCallback' from React
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user: loggedInAdmin } = useAuth(); 

  // 2. Wrap your 'fetchUsers' function in 'useCallback'
  const fetchUsers = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/users', config);
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setError(error.response?.data?.message || 'Failed to fetch users');
    }
    setLoading(false);
  }, [token]); // <-- 3. Add 'token' as a dependency for useCallback  

  useEffect(() => {
    if(loggedInAdmin) { 
        fetchUsers();
    }
  }, [loggedInAdmin, fetchUsers]); // <-- 4. Now, add 'fetchUsers' to the dependency array

  // This function is fine as-is because it's only called by an event (onClick)
  const deleteHandler = async (idToDelete) => {
    if (idToDelete === loggedInAdmin._id) {
      alert("You cannot delete your own admin account.");
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/users/${idToDelete}`, config);
        fetchUsers(); 
      } catch (error) {
        alert('Failed to delete user: ' + error.response?.data?.message);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading users...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;

 return (
    <div className="skill-list-container">
      <h2>Admin Panel: All Users ({users.length})</h2>
      <div className="form-container">
        {users.map(user => (
          <div key={user._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>
                <strong>Name:</strong> 
                {/* 2. Make the name a link */}
                <Link 
                  to={`/admin/user/${user._id}`} 
                  state={{ userName: user.name }} // <-- This passes the name to the next page
                  style={{ marginLeft: '5px', color: '#007bff', textDecoration: 'none' }}
                >
                  {user.name}
                </Link>
              </p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
            </div>
            
            {loggedInAdmin && loggedInAdmin._id !== user._id && (
              <button
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' }}
                onClick={() => deleteHandler(user._id)}
              >
                Delete User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;