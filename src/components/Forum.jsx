/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
    type === 'Need-regular' ? '#f5f5f7' :
    type === 'Need-emergency' ? '#fef2f2' :
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

  &.Need-regular {
    background-color: #f5f5f7;
    color: #1d1d1f;
  }

  &.Need-emergency {
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
  background: ${(props) => (props.active ? '#007AFF' : '#f5f5f7')};
  color: ${(props) => (props.active ? 'white' : '#1d1d1f')};
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

// 添加轮播图相关样式
const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: contain;
  background-color: #000;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    opacity: 0.9;
    line-height: 1.5;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 2;
  
  &:hover {
    background: white;
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const Forum = () => {
  const location = useLocation();
  const disasterLocation = location.state?.location || ''; // 获取传递的灾区地址
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    description: '',
    contact: '',
    type: 'Need-regular',
    tags: [],
    newTag: '',
    image: null,
    location: disasterLocation
  });
  const [filter, setFilter] = useState('official');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 添加轮播图数据
  const officialSlides = [
    {
      image: "https://media.npr.org/assets/img/2015/04/27/monkey-temple-comp_custom-25d2daaf34ff52407021e71eaa74d2f960a2926f.jpg?s=1600&c=85&f=webp", // 请确保这些图片存在
      title: "Protecting Cultural Heritage",
      description: "Emergency procedures for safeguarding historical artifacts"
    },
    {
      image: "https://www.advantagearchives.com/wp-content/uploads/2024/09/disaster-plan-blog-thumbnail.png",
      title: "Disaster Prevention",
      description: "Guidelines for protecting cultural relics"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/ChristchurchBasilicaPostEarthquake_gobeirne.jpg/1600px-ChristchurchBasilicaPostEarthquake_gobeirne.jpg",
      title: "Community Support",
      description: "Join our preservation network"
    }
  ];

  // 添加轮播控制函数
  const handlePrevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? officialSlides.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => 
      prev === officialSlides.length - 1 ? 0 : prev + 1
    );
  };

  // 获取所有帖子
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // 根据灾区地址和过滤器条件过滤帖子
  const filteredPosts = posts.filter(post => 
    post.location?.toLowerCase() === disasterLocation?.toLowerCase() && // 只显示与灾区地址匹配的帖子
    (
      filter === 'all' || 
      (filter === 'offer' && post.type === 'offer') || 
      (filter === 'Need' && (post.type === 'Need-regular' || post.type === 'Need-emergency'))
    )
  );

  // 处理表单输入变化
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

  // 点击选择按钮后更新类型
  const handleTypeSelection = (type) => {
    setFormData((prev) => ({
      ...prev,
      type: type,
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: formData.description,
      content: `${formData.itemName} - quantity: ${formData.quantity}\n${formData.description}\nContact Number: ${formData.contact}`,
      type: formData.type,
      tags: [formData.itemName, ...formData.tags],
      image: formData.image,
      location: disasterLocation
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, newPost);
      setPosts(prev => [...prev, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit post:", error);
    }

    setFormData({
      itemName: '',
      quantity: '',
      description: '',
      contact: '',
      type: 'Need-regular',
      tags: [],
      newTag: '',
      image: null,
      location: disasterLocation
    });
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
            <option value="Need">Need Posts</option>
            <option value="offer">Offer Posts</option>
            <option value="official">Official</option>
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
                active={formData.type === 'Need-emergency'}
                onClick={() => handleTypeSelection('Need-emergency')}
              >
                Need
              </TypeButton>
              <TypeButton
                active={formData.type === 'offer'}
                onClick={() => handleTypeSelection('offer')}
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
          {filter === 'official' ? (
            <CarouselContainer>
              <CarouselTrack currentSlide={currentSlide}>
                {officialSlides.map((slide, index) => (
                  <Slide key={index}>
                    <SlideImage src={slide.image} alt={slide.title} />
                    <SlideContent>
                      <h2>{slide.title}</h2>
                      <p>{slide.description}</p>
                    </SlideContent>
                  </Slide>
                ))}
              </CarouselTrack>
              <CarouselButton onClick={handlePrevSlide} className="prev">
                ←
              </CarouselButton>
              <CarouselButton onClick={handleNextSlide} className="next">
                →
              </CarouselButton>
            </CarouselContainer>
          ) : (
            <PostGrid>
              {filteredPosts.map(post => (
                <PostCard key={post.id} type={post.type}>
                  <PostType className={post.type}>
                    {post.type === 'Need-regular' && 'Regular Need'}
                    {post.type === 'Need-emergency' && 'Emergency Need'}
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
          )}
        </ContentArea>
      </MainContent>
    </ForumContainer>
  );
};

export default Forum;