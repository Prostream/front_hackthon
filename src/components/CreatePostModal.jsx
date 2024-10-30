import React, { useState } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1d1d1f;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0071e3;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0071e3;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #0071e3;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #0071e3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0077ED;
  }
`;

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
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <h2>Create New Post</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Content</Label>
            <TextArea
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Type</Label>
            <Select
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="Need-regular">Regular Need</option>
              <option value="Need-emergency">Emergency Need</option>
              <option value="offer">Offer</option>
            </Select>
          </FormGroup>
          
          <SubmitButton type="submit">Create Post</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CreatePostModal; 