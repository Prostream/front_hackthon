import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Forum from './components/Forum';
import ChatBot from './components/ChatBot';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </Router>
      <ChatBot />
    </>
  );
};

export default App; 