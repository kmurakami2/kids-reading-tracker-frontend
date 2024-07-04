import React, { useState } from 'react';
import styled from 'styled-components';
import { addReadingLog } from '../services/api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 20px auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #966F33;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #567D46;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4A6D3A;
  }
`;

const ReadingLogForm = ({ onLogAdded }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [minutesRead, setMinutesRead] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReadingLog({
        book_title: bookTitle,
        pages_read: parseInt(pagesRead),
        minutes_read: parseInt(minutesRead),
        date: new Date().toISOString()
      });
      alert('読書ログが追加されました！');
      setBookTitle('');
      setPagesRead('');
      setMinutesRead('');
      onLogAdded(); // 親コンポーネントに通知
    } catch (error) {
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="本のタイトル"
        required
      />
      <Input
        type="number"
        value={pagesRead}
        onChange={(e) => setPagesRead(e.target.value)}
        placeholder="読んだページ数"
        required
      />
      <Input
        type="number"
        value={minutesRead}
        onChange={(e) => setMinutesRead(e.target.value)}
        placeholder="読書時間（分）"
        required
      />
      <Button type="submit">記録する</Button>
    </Form>
  );
};

export default ReadingLogForm;