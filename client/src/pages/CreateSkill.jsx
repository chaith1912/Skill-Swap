import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // To get the token

const CreateSkill = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillType: 'Offering', // Default value
    category: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth(); // Get the token from our context

  const { title, description, skillType, category } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // This is the data we'll send
    const newSkill = {
      title,
      description,
      skillType,
      category,
    };

    // We must send our token in the headers to access this protected route
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make the POST request
      await axios.post(
        'http://localhost:5000/api/skills',
        newSkill,
        config
      );

      alert('Skill posted successfully!');
      navigate('/'); // Redirect to the homepage to see the new skill
    } catch (err) {
      console.error(err.response.data.message);
      setError(err.response.data.message || 'Failed to post skill');
    }
  };

  return (
    // We can reuse the .form-container CSS you already have!
    <div className="form-container">
      <h2>Post a New Skill</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
            rows="4"
          />
        </div>
        <div className="form-group">
          <label>Are you Offering or Seeking this skill?</label>
          <select name="skillType" value={skillType} onChange={onChange}>
            <option value="Offering">Offering</option>
            <option value="Seeking">Seeking</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category (e.g., Programming, Design, Music)</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Post Skill</button>
      </form>
    </div>
  );
};

export default CreateSkill;