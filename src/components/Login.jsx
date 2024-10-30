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
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [disasterLocation, setDisasterLocation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    setDisasterLocation(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);

      if (response.status === 200) {
        setMessage({ text: 'We will help you one step ahead of the disaster!', type: 'success' });
        setShowLocationModal(true); // 显示地址弹窗
      } else {
        setMessage({ text: `Login failed: ${response.data.message}`, type: 'error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  const handleConfirmLocation = () => {
    setShowLocationModal(false);
    navigate('/forum', { state: { location: disasterLocation } }); // 跳转并传递地址
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

      {/* 灾区地址弹出窗口 */}
      {showLocationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Disaster Location</h3>
            <input
              type="text"
              value={disasterLocation}
              onChange={handleLocationChange}
              placeholder="Enter disaster location"
            />
            <button onClick={handleConfirmLocation} className="confirm-button">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
