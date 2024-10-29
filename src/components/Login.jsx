// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      console.log(`${process.env.REACT_APP_API_URL}`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);

      if (response.status === 200) {
        setMessage({ text: 'Login successful!', type: 'success' });
        setTimeout(() => navigate('/forum'), 2000);
      } else {
        setMessage({ text: `Login failed: ${response.data.message}`, type: 'error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <button onClick={() => navigate('/')} className="home-button">
          Home
        </button>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-button">Log In</button>
        <button onClick={() => navigate('/register')} className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Login;
