/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';

const ForumContainer = styled.div`
  min-height: 100vh;
  background-color: #f2f2f2;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 1.5rem 4rem;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const MainContent = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.isVisible ? '200px' : '0')};
  padding: ${(props) => (props.isVisible ? '2rem' : '0')};
  background-color: #ffffff;
  box-shadow: ${(props) => (props.isVisible ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};
  overflow: hidden;
  transition: width 0.3s ease, padding 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  left: ${(props) => (props.isVisible ? '210px' : '10px')};
  top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: left 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const FilterButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
`;

const PostGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const PostCard = styled.div`
  background: ${({ type }) =>
    type === 'help-regular' ? '#ffebeb' :
    type === 'help-emergency' ? '#ffe6e6' :
    '#eaf7eb'};
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

  &.help-regular {
    background-color: #ffcccc;
    color: #cc0000;
  }

  &.help-emergency {
    background-color: #ff6666;
    color: #b30000;
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
      title: 'Need assist on purified water for a family',
      content: 'ZIP code xxxxxx, need assistance, contact: 123-456-8901',
      type: 'help-emergency',
      tags: ['food', 'Emergency']
    },
    {
      id: 2,
      title: 'Wheelchair available for assistance',
      content: 'ZIP code xxxxxx, one wheelchair available, contact: 123-456-789',
      type: 'offer',
      tags: ['necessities', 'Regular']
    },
    {
      id: 3,
      title: 'Temporary housing required',
      content: 'Looking for temporary housing in area xxxxxx. Contact: 234-567-8901',
      type: 'help-regular',
      tags: ['housing', 'Regular']
    },
    {
      id: 4,
      title: 'Food packages available for donation',
      content: 'Offering non-perishable food items. ZIP code xxxxxx. Contact: 345-678-9012',
      type: 'offer',
      tags: ['food', 'Regular']
    },
    {
      id: 5,
      title: 'Urgent medical supplies needed',
      content: 'In need of bandages, antiseptics. ZIP code xxxxxx. Contact: 456-789-0123',
      type: 'help-emergency',
      tags: ['medical', 'Emergency']
    },
    {
      id: 6,
      title: 'Offering free tutoring for kids',
      content: 'Available online or in-person in ZIP xxxxxx. Contact: 567-890-1234',
      type: 'offer',
      tags: ['education', 'Regular']
    },
    {
      id: 7,
      title: 'Urgent request for baby supplies',
      content: 'Need diapers and baby formula. ZIP code xxxxxx. Contact: 678-901-2345',
      type: 'help-emergency',
      tags: ['baby care', 'Emergency']
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleFilterClick = (type) => {
    setFilter(type);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' || 
    (filter === 'offer' && post.type === 'offer') || 
    (filter === 'help' && (post.type === 'help-regular' || post.type === 'help-emergency'))
  );

  return (
    <ForumContainer>
      <Header>
        <Title>Mutual Aid Forum</Title>
      </Header>

      <MainContent>
        <Sidebar isVisible={isSidebarVisible}>
          <FilterButton onClick={() => handleFilterClick('all')}>All</FilterButton>
          <FilterButton onClick={() => handleFilterClick('offer')}>Offer</FilterButton>
          <FilterButton onClick={() => handleFilterClick('help')}>Help</FilterButton>
        </Sidebar>

        <ToggleButton isVisible={isSidebarVisible} onClick={toggleSidebar}>
          {isSidebarVisible ? 'Hide Filter' : 'Show Filter'}
        </ToggleButton>

        <ContentArea>
          <PostGrid>
            {filteredPosts.map(post => (
              <PostCard key={post.id} type={post.type}>
                <PostType className={post.type}>
                  {post.type === 'help-regular' && 'Regular Help'}
                  {post.type === 'help-emergency' && 'Emergency Help'}
                  {post.type === 'offer' && 'Offer'}
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
        </ContentArea>
      </MainContent>
    </ForumContainer>
  );
};

export default Forum;
