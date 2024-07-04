import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 300px;
  margin: 0 auto 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #966F33;
  background-color: #F4A460;
  color: #4A4A4A;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  background-color: #567D46;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover, &:active {
    background-color: #4A6D3A;
  }
`;

const RewardForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points_required, setPointsRequired] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, points_required: Number(points_required) });
    setName('');
    setDescription('');
    setPointsRequired('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ご褒美の名前"
        required
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明（任意）"
      />
      <Input
        type="number"
        value={points_required}
        onChange={(e) => setPointsRequired(e.target.value)}
        placeholder="必要なポイント"
        required
      />
      <Button type="submit">ご褒美を追加</Button>
    </Form>
  );
};

export default RewardForm;