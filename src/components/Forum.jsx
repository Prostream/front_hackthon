/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';

const ForumContainer = styled.div`
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: relative;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  flex: 1;
  margin: 0;
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

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PostTag = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background-color: #e9ecef;
  color: #495057;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: #dee2e6;
  }

  span {
    font-size: 1.2rem;
    line-height: 1;
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

const CreatePostButton = styled.button`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.8rem 1.5rem;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066D6;
    transform: translateY(calc(-50% - 2px));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
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
  color: #1A1A1A;
  margin: 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${props => props.primary ? '#9B6B43' : '#666'};
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background: ${props => props.primary ? '#F7ECE3' : '#F5F5F5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  background: ${props => props.active ? '#007AFF' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
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

const FilterDropdown = styled.select`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  appearance: none;
  color: #007AFF;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007AFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }
`;

const ModalTag = styled.span`
  background: #F7ECE3;
  color: #9B6B43;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #9B6B43;
    color: white;
  }
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

  // 处理表�����入
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

  return (
    <ForumContainer>
      <Header>
        <FilterDropdown 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Posts</option>
          <option value="help">Help Posts</option>
          <option value="offer">Offer Posts</option>
        </FilterDropdown>
        <Title>互助论坛</Title>
        <CreatePostButton onClick={() => setIsModalOpen(true)}>
          发布新帖子
        </CreatePostButton>
      </Header>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>发布新帖子</ModalTitle>
              <ActionButton onClick={() => setIsModalOpen(false)}>关闭</ActionButton>
            </ModalHeader>

            <TypeSelector>
              <TypeButton 
                active={formData.type === 'help'}
                onClick={() => handleInputChange({ target: { name: 'type', value: 'help' } })}
              >
                求助
              </TypeButton>
              <TypeButton 
                active={formData.type === 'offer'}
                onClick={() => handleInputChange({ target: { name: 'type', value: 'offer' } })}
              >
                提供
              </TypeButton>
            </TypeSelector>

            <Input
              placeholder="物资名称"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />

            <Input
              placeholder="物资数量"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />

            <TextArea
              placeholder="详细描述"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />

            <Input
              placeholder="联系方式"
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
                <img src={formData.image} alt="预览" />
              ) : (
                <p>点击添加图片</p>
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
                placeholder="添加标签"
                value={formData.newTag}
                name="newTag"
                onChange={handleInputChange}
                onKeyPress={e => e.key === 'Enter' && handleAddTag(e)}
                style={{ marginBottom: 0 }}
              />
              <ActionButton onClick={handleAddTag} primary>添加</ActionButton>
            </div>

            <ActionButton 
              onClick={handleSubmit} 
              primary 
              style={{ width: '100%', padding: '0.8rem' }}
              disabled={!formData.itemName || !formData.description}
            >
              发布帖子
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