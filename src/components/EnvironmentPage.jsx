/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { FaLeaf, FaRecycle, FaWater, FaSeedling } from 'react-icons/fa';
import ChatBot from './ChatBot';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  padding: 40px;
  border-radius: 10px;
  color: white;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #2ecc71;
  margin-bottom: 15px;
`;

const EnvironmentPage = () => {
  const environmentalTips = [
    {
      icon: <FaLeaf />,
      title: '节约能源',
      description: '随手关灯，使用节能电器，减少能源浪费。'
    },
    {
      icon: <FaRecycle />,
      title: '垃圾分类',
      description: '做好垃圾分类，促进资源回收利用。'
    },
    {
      icon: <FaWater />,
      title: '节约用水',
      description: '珍惜水资源，养成节约用水的好习惯���'
    },
    {
      icon: <FaSeedling />,
      title: '植树造林',
      description: '参与植树活动，增加绿色空间。'
    }
  ];

  // 处理卡片点击的函数
  const handleCardClick = async (tip) => {
    try {
      // 发送请求到后端
      const response = await fetch('http://your-backend-api/environment-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: tip.title,
          description: tip.description
        })
      });

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      const data = await response.json();
      console.log('操作成功：', data);
      // 可以添加一些用户反馈，比如提示框
      alert(`${tip.title}行动已记录！`);
    } catch (error) {
      console.error('错误：', error);
      alert('操作失败，请稍后重试');
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>保护环境，从我做起</h1>
        <p>让我们一起为地球的未来贡献力量</p>
      </Header>

      <CardContainer>
        {environmentalTips.map((tip, index) => (
          <Card 
            key={index} 
            onClick={() => handleCardClick(tip)}
          >
            <IconWrapper>{tip.icon}</IconWrapper>
            <h2>{tip.title}</h2>
            <p>{tip.description}</p>
          </Card>
        ))}
      </CardContainer>

      <ChatBot />
    </PageContainer>
  );
};

export default EnvironmentPage;
