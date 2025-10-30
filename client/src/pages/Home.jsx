import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  // 1. Set up state to store your skills, loading status, and any errors
  const [skills, setSkills] = useState([]); // Will hold the array of skills
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // 3. Make the API call to your public endpoint
        const res = await axios.get('http://localhost:5000/api/skills');
        
        // 4. Store the data in state
        setSkills(res.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []); // The empty array [] means this effect runs once on load

  // 3. Add loading and error messages
  if (loading) {
    return <div>Loading skills...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  // 4. Render the list of skills
  return (
    <div className="skill-list-container">
      <h2>Skills Feed</h2>
      {skills.length === 0 ? (
        <p>No skills posted yet.</p>
      ) : (
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill._id} className="skill-card">
              <h3>{skill.title}</h3>
              <p><strong>Posted by:</strong> {skill.user.name}</p>
              <p><strong>Category:</strong> {skill.category}</p>
              <span className={`skill-type ${skill.skillType.toLowerCase()}`}>
                {skill.skillType}
              </span>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;