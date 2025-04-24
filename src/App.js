/** @jsxImportSource @emotion/react */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Forum from './components/Forum';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

// 配置API基础URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || '/api';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
