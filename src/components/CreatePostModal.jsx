import React, { useState } from 'react';
import '../styles/CreatePostModal.css';

const CreatePostModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'Need-regular',
    tags: [],
    newTag: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <h2>Create New Post</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="label">Content</label>
            <textarea
              className="textarea"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="label">Type</label>
            <select
              className="select"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="Need-regular">Regular Need</option>
              <option value="Need-emergency">Emergency Need</option>
              <option value="offer">Offer</option>
            </select>
          </div>
          
          <button className="submit-button" type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal; 