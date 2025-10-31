import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom'; // <-- 1. Import hooks
import { useAuth } from '../hooks/useAuth.jsx';

const AdminUserSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id: userId } = useParams(); // <-- 2. Get the user's ID from the URL
  const location = useLocation(); // <-- 3. Get the location object
  const userName = location.state?.userName || 'User'; // Get the name we passed
  
  const { token } = useAuth(); // Get admin token for API calls

  // 4. Define the fetchSkills function
  const fetchUserSkills = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // 5. Call your new backend route
      const { data } = await axios.get(`http://localhost:5000/api/skills/user/${userId}`, config);
      setSkills(data);
    } catch (error) {
      console.error('Failed to fetch user skills', error);
      setError(error.response?.data?.message || 'Failed to fetch skills');
    }
    setLoading(false);
  }, [token, userId]);

  useEffect(() => {
    fetchUserSkills();
  }, [fetchUserSkills]);

  // 6. Define the skill delete handler (reusing the admin delete route)
  const deleteSkillHandler = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/skills/${skillId}`, config);
        fetchUserSkills(); // Refetch the list
      } catch (error) {
        alert('Failed to delete skill: ' + error.response?.data?.message);
      }
    }
  };

  if (loading) return <div className="container"><p>Loading skills...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>{error}</p></div>;

  return (
    <div className="skill-list-container">
      <h2>Skills Posted by {userName}</h2> {/* <-- 7. Use the user's name */}
      <div className="skills-grid">
        {skills.length === 0 ? (
          <p>This user has not posted any skills.</p>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} className="skill-card">
              <h3>{skill.title}</h3>
              <p><strong>Category:</strong> {skill.category}</p>
              <span className={`skill-type ${skill.skillType.toLowerCase()}`}>
                {skill.skillType}
              </span>
              <p className="skill-description">{skill.description}</p>
              
              <button
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}
                onClick={() => deleteSkillHandler(skill._id)}
              >
                Delete Skill
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUserSkillsPage;