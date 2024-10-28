/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';

const ForumContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const CreatePostButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  /* 可以添加一个加号图标 */
  &:before {
    content: "+";
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const PostGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0 4rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PostCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background-color: #e9ecef;
  color: #495057;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dee2e6;
  }
`;

const PostType = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;

  &.help {
    background-color: #ffd3d3;
    color: #dc3545;
  }

  &.offer {
    background-color: #d4edda;
    color: #28a745;
  }
`;

const Forum = () => {
  const [posts] = useState([
    {
      id: 1,
      title: '需要帮助：急需饮用水',
      content: '位于xx地区，目前缺少饮用水，急需援助。联系电话：1xx-xxxx-xxxx',
      type: 'help',
      tags: ['饮用水', '紧急']
    },
    {
      id: 2,
      title: '提供帐篷10顶',
      content: '可以提供10顶帐篷，有需要的请联系。地点：xx区xx街',
      type: 'offer',
      tags: ['物资', '帐篷']
    }
  ]);

  return (
    <ForumContainer>
      <Header>
        <Title>互助论坛</Title>
        <CreatePostButton>
          发布新帖子
        </CreatePostButton>
      </Header>

      <PostGrid>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostType className={post.type}>
              {post.type === 'help' ? '求助' : '提供'}
            </PostType>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <TagsContainer>
              {post.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsContainer>
          </PostCard>
        ))}
      </PostGrid>
    </ForumContainer>
  );
};

export default Forum; 