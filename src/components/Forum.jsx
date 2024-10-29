/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';

const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  background-color: #ffffff;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #f2f2f2;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  padding: 0.5rem 0.8rem;
  background-color: #f5f5f7;
  color: #1d1d1f;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    background-color: #e8e8ed;
  }
`;

const Title = styled.h1`
  color: #1d1d1f;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.02em;
  margin: 0;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FilterDropdown = styled.select`
  padding: 0.8rem 2rem 0.8rem 1.2rem;
  border-radius: 980px;
  border: none;
  background-color: #f5f5f7;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  color: #1d1d1f;
  transition: all 0.3s ease;
  
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231d1d1f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 0.8em;

  &:hover {
    background-color: #e8e8ed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.1);
  }
`;

const CreatePostButton = styled.button`
  padding: 0.8rem 1.8rem;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 980px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0077ED;
  }
`;

const PostGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  padding: 2rem 0;
`;

const PostCard = styled.div`
  background: ${({ type }) =>
    type === 'help-regular' ? '#f5f5f7' :
    type === 'help-emergency' ? '#fef2f2' :
    '#f2f7f2'};
  padding: 1.8rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  h3 {
    color: #1d1d1f;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    color: #424245;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const PostType = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;

  &.help-regular {
    background-color: #f5f5f7;
    color: #1d1d1f;
  }

  &.help-emergency {
    background-color: #fef2f2;
    color: #dc2626;
  }

  &.offer {
    background-color: #f2f7f2;
    color: #166534;
  }
`;

const PostTag = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background-color: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e8e8ed;
  }
`;

const MainContent = styled.div`
  display: flex;
  position: relative;
  padding-top: 1rem;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 0 2rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${props => props.primary ? '#007AFF' : '#666'};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background: ${props => props.primary ? '#F0F7FF' : '#F5F5F5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TypeButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#007AFF' : '#f5f5f7'};
  color: ${props => props.active ? 'white' : '#1d1d1f'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ImageUpload = styled.div`
  border: 2px dashed #e5e5e5;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  margin-bottom: 1rem;

  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Forum = () => {
  const [posts, setPosts] = useState([
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    description: '',
    contact: '',
    type: 'help',
    tags: [],
    newTag: '',
    image: null
  });
  const [filter, setFilter] = useState('all');

  // 处理表输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理标签添加
  const handleAddTag = (e) => {
    e.preventDefault();
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  // 处理标签删除
  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // 处理图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: formData.description,
      content: `${formData.itemName} - 数量: ${formData.quantity}\n${formData.description}\n联系方式: ${formData.contact}`,
      type: formData.type,
      tags: [formData.itemName, ...formData.tags],
      image: formData.image
    };

    setPosts(prev => [...prev, newPost]);
    setIsModalOpen(false);
    setFormData({
      itemName: '',
      quantity: '',
      description: '',
      contact: '',
      type: 'help',
      tags: [],
      newTag: '',
      image: null
    });
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' || 
    (filter === 'offer' && post.type === 'offer') || 
    (filter === 'help' && (post.type === 'help-regular' || post.type === 'help-emergency'))
  );

  // 添加这个处理函数
  const handleFilterClick = (value) => {
    setFilter(value);
  };

  const handleBackToHome = () => {
    // 根据你的路由设置添加返回逻辑
    window.location.href = '/';  // 或使用 React Router 的导航方法
  };

  return (
    <ForumContainer>
      <Header>
        <TitleRow>
          <BackButton onClick={handleBackToHome}>
            ← Back to Home
          </BackButton>
          <Title>Community Forum</Title>
          <div style={{ width: '116px' }}></div>
        </TitleRow>
        <ActionRow>
          <FilterDropdown 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Posts</option>
            <option value="help">Help Posts</option>
            <option value="offer">Offer Posts</option>
          </FilterDropdown>
          <CreatePostButton onClick={() => setIsModalOpen(true)}>
            Create New Post
          </CreatePostButton>
        </ActionRow>
      </Header>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>New Post</ModalTitle>
              <ActionButton onClick={() => setIsModalOpen(false)}>Close</ActionButton>
            </ModalHeader>

            <TypeSelector>
              <TypeButton 
                active={formData.type === 'help'}
                onClick={() => handleInputChange({ target: { name: 'type', value: 'help' } })}
              >
                Help
              </TypeButton>
              <TypeButton 
                active={formData.type === 'offer'}
                onClick={() => handleInputChange({ target: { name: 'type', value: 'offer' } })}
              >
                Offer
              </TypeButton>
            </TypeSelector>

            <Input
              placeholder="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />

            <Input
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />

            <TextArea
              placeholder="Detailed Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />

            <Input
              placeholder="Contact Information"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />

            <ImageUpload onClick={() => document.getElementById('imageInput').click()}>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {formData.image ? (
                <img src={formData.image} alt="Preview" />
              ) : (
                <p>Click to Add Image</p>
              )}
            </ImageUpload>

            <TagContainer>
              {formData.tags.map(tag => (
                <PostTag key={tag} onClick={() => handleRemoveTag(tag)}>
                  {tag}
                  <span>×</span>
                </PostTag>
              ))}
            </TagContainer>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Input
                placeholder="Add Tag"
                value={formData.newTag}
                name="newTag"
                onChange={handleInputChange}
                onKeyPress={e => e.key === 'Enter' && handleAddTag(e)}
                style={{ marginBottom: 0 }}
              />
              <ActionButton 
                onClick={handleAddTag} 
                primary
                style={{ background: '#007AFF', color: 'white' }}
              >
                Add
              </ActionButton>
            </div>

            <ActionButton 
              onClick={handleSubmit} 
              primary
              style={{ 
                width: '100%', 
                padding: '0.8rem',
                background: '#007AFF',
                color: 'white'
              }}
              disabled={!formData.itemName || !formData.description}
            >
              Submit Post
            </ActionButton>
          </ModalContent>
        </Modal>
      )}

      <MainContent>
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
                    <PostTag key={tag}>{tag}</PostTag>
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