/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

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

const Logo = styled.h1`
  color: #1d1d1f;
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
  margin-bottom: 2rem;
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
        <PartnersGrid>
          <PartnerCard>
            <h4>世界自然基金会</h4>
            <p>电话：xxx-xxxx-xxxx</p>
            <p>邮箱：contact@wwf.org</p>
          </PartnerCard>
          <PartnerCard>
            <h4>联合国环境规划署</h4>
            <p>电话：xxx-xxxx-xxxx</p>
            <p>邮箱：contact@unep.org</p>
          </PartnerCard>
          <PartnerCard>
            <h4>中国环境保护部</h4>
            <p>电话：xxx-xxxx-xxxx</p>
            <p>邮箱：contact@mee.gov.cn</p>
          </PartnerCard>
          {/* 可以添加更多合作机构 */}
        </PartnersGrid>
      </PartnersSection>
    </HomeContainer>
  );
};

export default HomePage; 