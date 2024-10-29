/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

import { WiStormWarning, WiEarthquake, WiFlood, WiTornado, WiFire, WiThermometer } from 'react-icons/wi';
import { useTranslation } from 'react-i18next';


// 弹出窗口的样式
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: #1d1d1f;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #0071e3;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: #f5f5f7;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  font-size: 2rem;
  color: #0071e3;
  display: flex;
  align-items: center;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoTitle = styled.h1`
  color: #1d1d1f;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0;
`;

const LogoSubtitle = styled.span`
  color: #86868b;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 980px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &.primary {
    background-color: #0071e3;
    color: white;
    &:hover {
      background-color: #0077ED;
    }
  }
  
  &.secondary {
    background-color: #fff;
    color: #0071e3;
    border: 1px solid #0071e3;
    &:hover {
      background-color: #f5f5f7;
    }
  }
`;

const MainContent = styled.main`
  padding: 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisasterMap = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 0 auto;
  text-align: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const MapTitle = styled.h2`
  color: #1d1d1f;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const PartnersSection = styled.footer`
  padding: 3rem 4rem;
  background: linear-gradient(
    135deg,
    #000000 0%,
    #1d1d1f 100%
  );
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const PartnersTitle = styled.h3`
  color: #f5f5f7;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const PartnerCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 24px;
  border-radius: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #f5f5f7;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  h4 {
    color: #f5f5f7;
    margin-bottom: 12px;
    font-weight: 500;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 8px 0;
    font-size: 0.9rem;
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AlertCard = styled.div`
  background: ${props => {
    switch(props.severity) {
      case 'Extreme': return 'rgba(255, 59, 48, 0.1)';
      case 'Severe': return 'rgba(255, 149, 0, 0.1)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.severity) {
      case 'Extreme': return '#ff3b30';
      case 'Severe': return '#ff9500';
      default: return '#0071e3';
    }
  }};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const AlertTitle = styled.h4`
  color: #1d1d1f;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const AlertInfo = styled.div`
  color: #484848;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const AlertsContainer = styled.div`
  height: calc(100% - 4rem);
  overflow-y: auto;
  padding: 16px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const NoAlertsMessage = styled.div`
  color: #1d1d1f;
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
`;

// 添加新的样式组件
const WeatherMap = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f7;
  position: relative;
  margin-top: 40px;
`;

const MapControls = styled.div`
  position: absolute;
  top: -40px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MapSelect = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  font-size: 0.9rem;
  color: #1d1d1f;
  cursor: pointer;
  outline: none;
  min-width: 120px;
  
  &:hover {
    border-color: #0071e3;
  }
  
  &:focus {
    border-color: #0071e3;
    box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
  }
`;


// Add new resources section
const ResourcesSection = styled.section`
  padding: 60px 20px;
  background: f5f5f7
  );
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const ResourcesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #2D3748;     
  margin-bottom: 40px;
  `;


const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  // Show 3 cards per row
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);  // 2 cards per row on tablets
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;  // 1 card per row on mobile
  }
`;

const ResourceCard = styled.a`
  background: white;  // White background
  border-radius: 16px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);  
  }
`;

const ResourceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  color: #0071e3;
`;

const ResourceName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #1d1d1f;     
`;

const ResourceDescription = styled.p`
  text-align: center;
  color: #86868b;     
  font-size: 14px;
  line-height: 1.5;
`;



// 添加新的样式组件
const LanguageSelect = styled.select`
  padding: 6px 12px;
  border-radius: 980px;
  border: 1px solid #0071e3;
  background: white;
  font-size: 0.9rem;
  color: #0071e3;
  cursor: pointer;
  outline: none;
  margin-left: 1rem;
  
  &:hover {
    background-color: #f5f5f7;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [mapLayer, setMapLayer] = useState('temp_new');
  const [showModal, setShowModal] = useState(false);
  const [disasterLocation, setDisasterLocation] = useState('');
  const { t, i18n } = useTranslation();

  // 打开弹窗
  const openModal = () => setShowModal(true);

  // 关闭弹窗
  const closeModal = () => setShowModal(false);

  // 处理地址输入
  const handleLocationChange = (e) => setDisasterLocation(e.target.value);

  // 跳转到 Forum 页面，并传递灾区地址
  const goToForum = () => {
    if (disasterLocation.trim()) {
      closeModal();
      navigate('/forum', { state: { location: disasterLocation } });
    }
  };

  
  const nationalResources = [
    {
      name: "resources.stormPrediction.name",
      description: "resources.stormPrediction.description",
      icon: <WiStormWarning />,
      url: "https://www.spc.noaa.gov/"
    },
    {
      name: "resources.earthquakeAlerts.name",
      description: "resources.earthquakeAlerts.description",
      icon: <WiEarthquake />,
      url: "https://earthquake.usgs.gov/"
    },
    {
      name: "resources.floodWarnings.name",
      description: "resources.floodWarnings.description",
      icon: <WiFlood />,
      url: "https://water.weather.gov/ahps/"
    },
    {
      name: "resources.severeWeather.name",
      description: "resources.severeWeather.description",
      icon: <WiTornado />,
      url: "https://www.weather.gov/safety/"
    },
    {
      name: "resources.wildfireUpdates.name",
      description: "resources.wildfireUpdates.description",
      icon: <WiFire />,
      url: "https://www.nifc.gov/fire-information"
    },
    {
      name: "resources.heatWarnings.name",
      description: "resources.heatWarnings.description",
      icon: <WiThermometer />,
      url: "https://www.weather.gov/safety/heat"
    }
  ];
  
  
  const API_KEY = '31242e954b8cb7ee0b16850d2ff39574';

  return (
    <HomeContainer>
      <Header>
        <Logo>
          <LogoIcon>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" 
                      stroke="currentColor" 
                      strokeWidth="2"/>
            </svg>
          </LogoIcon>
          <LogoText>
            <LogoTitle>{t('title')}</LogoTitle>
            <LogoSubtitle>{t('subtitle')}</LogoSubtitle>
          </LogoText>
        </Logo>
        <ButtonGroup>
          <Button onClick={() => navigate('/login')} className="primary">
            {t('signin')}
          </Button>
          <Button onClick={openModal} className="secondary">
            {t('community')}
          </Button>
          <LanguageSelect onChange={(e) => i18n.changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="zh">中文</option>
          </LanguageSelect>
        </ButtonGroup>
      </Header>

      {/* 弹出窗口 */}
      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{t('modal.title')}</ModalTitle>
            <AddressInput
              type="text"
              placeholder={t('modal.placeholder')}
              value={disasterLocation}
              onChange={handleLocationChange}
            />
            <ModalButton onClick={goToForum}>{t('modal.confirm')}</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <MainContent>
        <DisasterMap>
          <MapTitle>{t('map.title')}</MapTitle>
          <WeatherMap>
            <MapControls>
              <MapSelect 
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
              >
                <option value="temp_new">{t('map.temperature')}</option>
                <option value="precipitation_new">{t('map.precipitation')}</option>
                <option value="clouds_new">{t('map.clouds')}</option>
                <option value="pressure_new">{t('map.pressure')}</option>
                <option value="wind_new">{t('map.wind')}</option>
              </MapSelect>
            </MapControls>
            <iframe
              src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=${mapLayer}&lat=30&lon=0&zoom=2`}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ 
                border: 0,
                borderRadius: '12px',
                marginTop: '10px'
              }}
              allowFullScreen
              title="Weather Map"
            />
          </WeatherMap>
        </DisasterMap>
      </MainContent>

      <ResourcesSection>
        <ResourcesTitle>{t('resourcesTitle')}</ResourcesTitle>
        <ResourcesGrid>
          {nationalResources.map((resource, index) => (
            <ResourceCard 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ResourceIcon>{resource.icon}</ResourceIcon>
              <ResourceName>{t(resource.name)}</ResourceName>
              <ResourceDescription>{t(resource.description)}</ResourceDescription>
            </ResourceCard>
          ))}
        </ResourcesGrid>
      </ResourcesSection>

      <PartnersSection>
        <PartnersTitle>{t('partners.title')}</PartnersTitle>
        <PartnersGrid>
          <PartnerCard>
            <h4>World Wildlife Fund</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@wwf.org</p>
          </PartnerCard>
          <PartnerCard>
            <h4>United Nations Environment</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@unep.org</p>
          </PartnerCard>
          <PartnerCard>
            <h4>Red Cross</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@redcross.org</p>
          </PartnerCard>
        </PartnersGrid>
      </PartnersSection>

    </HomeContainer>
  );
};

      
export default HomePage; 