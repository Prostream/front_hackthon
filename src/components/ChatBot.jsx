/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaRobot, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001;
`;

const ChatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1d1d1f;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: #2d2d2f;
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background: #f5f5f7;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 18px 20px;
  background: #1d1d1f;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const SelectContainer = styled.div`
  padding: 20px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
`;

const DisasterSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 15px;
  color: #1d1d1f;
  background-color: white;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #1d1d1f;
  }
  
  &:hover {
    border-color: #1d1d1f;
  }
  
  /* 添加自定义下拉箭头 */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
`;

const ResponseArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: white;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const AdviceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AdviceItem = styled.li`
  padding: 12px 16px;
  margin-bottom: 8px;
  background: #f8f8f8;
  border-radius: 8px;
  color: #1d1d1f;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateX(4px);
  }
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const { t } = useTranslation();

  const handleDisasterSelect = (e) => {
    setSelectedDisaster(e.target.value);
  };

  return (
    <ChatBotContainer>
      <ChatIcon onClick={() => setIsOpen(!isOpen)}>
        <FaRobot size={28} />
      </ChatIcon>

      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <span>Emergency Response Assistant</span>
            <CloseButton 
              size={20}
              onClick={() => setIsOpen(false)}
            />
          </ChatHeader>

          <SelectContainer>
            <DisasterSelect 
              value={selectedDisaster}
              onChange={handleDisasterSelect}
            >
              <option value="">Select Emergency Type</option>
              {Object.entries(DISASTER_RESPONSES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}
            </DisasterSelect>
          </SelectContainer>

          <ResponseArea>
            {selectedDisaster && (
              <AdviceList>
                {DISASTER_RESPONSES[selectedDisaster].advice.map((advice, index) => (
                  <AdviceItem key={index}>{advice}</AdviceItem>
                ))}
              </AdviceList>
            )}
          </ResponseArea>
        </ChatWindow>
      )}
    </ChatBotContainer>
  );
};

export default ChatBot;