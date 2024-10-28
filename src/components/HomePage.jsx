/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: #3498db;
    color: white;
    &:hover {
      background-color: #2980b9;
    }
  }
  
  &.secondary {
    background-color: #fff;
    color: #3498db;
    border: 2px solid #3498db;
    &:hover {
      background-color: #3498db;
      color: white;
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
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
  margin: 0 auto;
  text-align: center;
`;

const MapTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const PartnersSection = styled.footer`
  padding: 3rem 4rem;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const PartnersTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Header>
        <Logo>灾害预警系统</Logo>
        <ButtonGroup>
          <Button onClick={() => navigate('/login')} className="primary">登录</Button>
          <Button onClick={() => navigate('/forum')} className="secondary">进入互助论坛</Button>
        </ButtonGroup>
      </Header>

      <MainContent>
        <DisasterMap>
          <MapTitle>实时灾害预警地图</MapTitle>
          <div style={{ 
            width: '100%', 
            height: 'calc(100% - 4rem)', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px' 
          }}>
            {/* 地图内容 */}
          </div>
        </DisasterMap>
      </MainContent>

      <PartnersSection>
        <PartnersTitle>合作机构</PartnersTitle>
        <div className="partners-grid">
          <div className="partner-card">
            <h4>世界自然基金会</h4>
            <p>电话：xxx-xxxx-xxxx</p>
            <p>邮箱：contact@wwf.org</p>
          </div>
        </div>
      </PartnersSection>
    </HomeContainer>
  );
};

export default HomePage; 