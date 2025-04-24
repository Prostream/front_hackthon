/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Forum.css';

const Forum = () => {
  const location = useLocation();
  const disasterLocation = location.state?.location || '';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const officialSlides = [
    {
      image: "https://media.npr.org/assets/img/2015/04/27/monkey-temple-comp_custom-25d2daaf34ff52407021e71eaa74d2f960a2926f.jpg",
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

  const filteredPosts = posts.filter(post => 
    post.location?.toLowerCase() === disasterLocation?.toLowerCase() &&
    (
      filter === 'all' || 
      (filter === 'offer' && post.type === 'offer') || 
      (filter === 'Need' && (post.type === 'Need-regular' || post.type === 'Need-emergency'))
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

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

  const handleTypeSelection = (type) => {
    setFormData((prev) => ({
      ...prev,
      type: type,
    }));
  };

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
    window.location.href = '/';
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      setIsSearchMode(true);
      console.log('开始搜索，关键词:', searchQuery);
      console.log('isSearchMode设置为:', true);

      const vectorResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/vector`, {
        params: {
          query: searchQuery
        }
      });

      if (vectorResponse.data.success) {
        console.log('相似帖子:', vectorResponse.data.similarPosts);
        setSearchResults(vectorResponse.data.similarPosts.map(post => ({
          ...post,
          similarity: (post.similarity * 100).toFixed(2) + '%'
        })));
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 添加清除搜索的函数
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchMode(false);
  };

  // 修改 filter 变化的处理
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    clearSearch(); // 切换 filter 时清除搜索状态
  };

  // 在渲染部分之前添加状态检查
  console.log('渲染时状态:', {
    filter,
    isSearchMode,
    searchResultsLength: searchResults.length,
    searchResults
  });

  return (
    <div className="forum-container">
      <style>
        {`
          .similarity-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #007AFF;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }

          .post-card {
            position: relative;
            /* ... 保持原有样式 ... */
          }

          .search-container {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .clear-search {
            background: #f5f5f7;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
          }
          .clear-search:hover {
            background: #e5e5e7;
          }
        `}
      </style>
      <header className="forum-header">
        <div className="title-row">
          <button className="back-button" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <h1 className="forum-title">Community Forum</h1>
          <div style={{ width: '116px' }}></div>
        </div>
        <div className="action-row">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search Posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
            {isSearchMode && (
              <button className="clear-search" onClick={clearSearch}>
                Clear Search
              </button>
            )}
          </div>
          <select 
            className="filter-dropdown"
            value={filter} 
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Posts</option>
            <option value="Need">Need Posts</option>
            <option value="offer">Offer Posts</option>
            <option value="official">Official</option>
          </select>
          <button className="create-post-button" onClick={() => setIsModalOpen(true)}>
            Create New Post
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">New Post</h2>
              <button className="action-button" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>

            <div className="type-selector">
              <button
                className="type-button"
                style={{
                  '--button-bg': formData.type === 'Need-emergency' ? '#007AFF' : '#f5f5f7',
                  '--button-color': formData.type === 'Need-emergency' ? 'white' : '#1d1d1f'
                }}
                onClick={() => handleTypeSelection('Need-emergency')}
              >
                Need
              </button>
              <button
                className="type-button"
                style={{
                  '--button-bg': formData.type === 'offer' ? '#007AFF' : '#f5f5f7',
                  '--button-color': formData.type === 'offer' ? 'white' : '#1d1d1f'
                }}
                onClick={() => handleTypeSelection('offer')}
              >
                Offer
              </button>
            </div>

            <input
              className="input"
              placeholder="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />

            <input
              className="input"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />

            <textarea
              className="textarea"
              placeholder="Detailed Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />

            <input
              className="input"
              placeholder="Contact Information"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />

            <div className="image-upload" onClick={() => document.getElementById('imageInput').click()}>
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
            </div>

            <div className="tag-container">
              {formData.tags.map(tag => (
                <span key={tag} className="post-tag" onClick={() => handleRemoveTag(tag)}>
                  {tag}
                  <span>×</span>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                className="input"
                placeholder="Add Tag"
                value={formData.newTag}
                name="newTag"
                onChange={handleInputChange}
                onKeyPress={e => e.key === 'Enter' && handleAddTag(e)}
                style={{ marginBottom: 0 }}
              />
              <button 
                className="action-button"
                style={{
                  '--button-color': '#007AFF',
                  '--button-hover-bg': '#F0F7FF'
                }}
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>

            <button 
              className="action-button"
              style={{
                width: '100%',
                padding: '0.8rem',
                '--button-color': 'white',
                '--button-hover-bg': '#007AFF',
                background: '#007AFF'
              }}
              onClick={handleSubmit}
              disabled={!formData.itemName || !formData.description}
            >
              Submit Post
            </button>
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="content-area">
          {filter === 'official' ? (
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ '--current-slide': currentSlide }}
              >
                {officialSlides.map((slide, index) => (
                  <div key={index} className="slide">
                    <img className="slide-image" src={slide.image} alt={slide.title} />
                    <div className="slide-content">
                      <h2>{slide.title}</h2>
                      <p>{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-button prev" onClick={handlePrevSlide}>
                ←
              </button>
              <button className="carousel-button next" onClick={handleNextSlide}>
                →
              </button>
            </div>
          ) : isSearchMode && searchResults.length > 0 ? (
            <div className="post-grid">
              {searchResults.map(post => (
                <div 
                  key={post._id} 
                  className="post-card"
                  style={{
                    '--card-bg': post.type === 'Need-regular' ? '#f5f5f7' :
                                post.type === 'Need-emergency' ? '#fef2f2' :
                                '#f2f7f2'
                  }}
                >
                  <span className={`post-type ${post.type.toLowerCase()}`}>
                    {post.type === 'Need-regular' && 'Regular Need'}
                    {post.type === 'Need-emergency' && 'Emergency Need'}
                    {post.type === 'offer' && 'Offer'}
                  </span>
                  <div className="similarity-badge">
                    Similarity: {post.similarity}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="tags-container">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="post-grid">
              {filteredPosts.map(post => (
                <div 
                  key={post._id || post.id} 
                  className="post-card"
                  style={{
                    '--card-bg': post.type === 'Need-regular' ? '#f5f5f7' :
                                post.type === 'Need-emergency' ? '#fef2f2' :
                                '#f2f7f2'
                  }}
                >
                  <span className={`post-type ${post.type.toLowerCase()}`}>
                    {post.type === 'Need-regular' && 'Regular Need'}
                    {post.type === 'Need-emergency' && 'Emergency Need'}
                    {post.type === 'offer' && 'Offer'}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="tags-container">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;