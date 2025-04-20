/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../styles/ChatBot.css';

// 预设的灾难类型和对应建议
const DISASTER_RESPONSES = {
  earthquake: {
    title: 'Earthquake',
    advice: [
      '1. Stay calm and take cover under a sturdy desk or table',
      '2. Stay away from windows and potential falling objects',
      '3. Prepare an emergency kit with food, water, and first aid supplies',
      '4. Turn off gas and electricity',
      '5. Be cautious of aftershocks after the main quake'
    ]
  },
  flood: {
    title: 'Flood',
    advice: [
      '1. Move immediately to higher ground',
      '2. Prepare drinking water and food supplies',
      '3. Monitor official emergency alerts',
      '4. Avoid walking through flood waters',
      '5. Prepare waterproof items and emergency lighting'
    ]
  },
  hurricane: {
    title: 'Hurricane',
    advice: [
      '1. Secure doors and windows, anchor loose objects',
      '2. Stock up on food and drinking water',
      '3. Prepare flashlights and emergency lighting',
      '4. Stay indoors and away from windows',
      '5. Monitor weather alerts and follow official guidance'
    ]
  },
  wildfire: {
    title: 'Wildfire',
    advice: [
      '1. Evacuate immediately from danger zones',
      '2. Maintain communication channels',
      '3. Prepare protective masks',
      '4. Close all windows and doors to prevent smoke entry',
      '5. Follow instructions from fire authorities'
    ]
  },
  tornado: {
    title: 'Tornado',
    advice: [
      '1. Seek shelter in a basement or interior room',
      '2. Stay away from windows and outside walls',
      '3. Keep emergency supplies ready',
      '4. Monitor weather updates',
      '5. Have a battery-powered weather radio'
    ]
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const { t } = useTranslation();

  const handleDisasterSelect = (e) => {
    setSelectedDisaster(e.target.value);
  };

  return (
    <div className="chat-bot-container">
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaRobot size={28} />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Emergency Response Assistant</span>
            <FaTimes 
              className="close-button"
              size={20}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="select-container">
            <select 
              className="disaster-select"
              value={selectedDisaster}
              onChange={handleDisasterSelect}
            >
              <option value="">Select Emergency Type</option>
              {Object.entries(DISASTER_RESPONSES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}
            </select>
          </div>

          <div className="response-area">
            {selectedDisaster && (
              <ul className="advice-list">
                {DISASTER_RESPONSES[selectedDisaster].advice.map((advice, index) => (
                  <li key={index} className="advice-item">{advice}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;