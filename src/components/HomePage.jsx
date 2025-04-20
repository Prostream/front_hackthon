/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatBot from './ChatBot';
import { WiStormWarning, WiEarthquake, WiFlood, WiTornado, WiFire, WiThermometer } from 'react-icons/wi';
import { useTranslation } from 'react-i18next';
import '../styles/HomePage.css';

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
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" 
                      stroke="currentColor" 
                      strokeWidth="2"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1 className="logo-title">{t('title')}</h1>
            <span className="logo-subtitle">{t('subtitle')}</span>
          </div>
        </div>
        <div className="button-group">
          <button onClick={() => navigate('/login')} className="button primary">
            {t('signin')}
          </button>
          <button onClick={openModal} className="button secondary">
            {t('community')}
          </button>
          <select 
            className="language-select"
            onChange={(e) => i18n.changeLanguage(e.target.value)} 
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </header>

      {/* 弹出窗口 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{t('modal.title')}</h3>
            <input
              className="address-input"
              type="text"
              placeholder={t('modal.placeholder')}
              value={disasterLocation}
              onChange={handleLocationChange}
            />
            <button className="modal-button" onClick={goToForum}>{t('modal.confirm')}</button>
          </div>
        </div>
      )}

      <main className="main-content">
        <div className="disaster-map">
          <h2 className="map-title">{t('map.title')}</h2>
          <div className="weather-map">
            <div className="map-controls">
              <select 
                className="map-select"
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
              >
                <option value="temp_new">{t('map.temperature')}</option>
                <option value="precipitation_new">{t('map.precipitation')}</option>
                <option value="clouds_new">{t('map.clouds')}</option>
                <option value="pressure_new">{t('map.pressure')}</option>
                <option value="wind_new">{t('map.wind')}</option>
              </select>
            </div>
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
          </div>
        </div>
      </main>

      <section className="resources-section">
        <h2 className="resources-title">{t('resourcesTitle')}</h2>
        <div className="resources-grid">
          {nationalResources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-card"
            >
              <div className="resource-icon">{resource.icon}</div>
              <h3 className="resource-name">{t(resource.name)}</h3>
              <p className="resource-description">{t(resource.description)}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="partners-section">
        <h3 className="partners-title">{t('partners.title')}</h3>
        <div className="partners-grid">
          <div className="partner-card">
            <h4>World Wildlife Fund</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@wwf.org</p>
          </div>
          <div className="partner-card">
            <h4>United Nations Environment</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@unep.org</p>
          </div>
          <div className="partner-card">
            <h4>Red Cross</h4>
            <p>Tel: xxx-xxxx-xxxx</p>
            <p>Email: contact@redcross.org</p>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default HomePage; 