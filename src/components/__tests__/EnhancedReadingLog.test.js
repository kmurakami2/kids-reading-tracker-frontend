import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addReadingLog, getReadingLogs, updateReadingLog, deleteReadingLog } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F4A460;
  border-radius: 10px;
`;

const Title = styled.h1`
  color: #4A4A4A;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #966F33;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #966F33;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #567D46;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4A6D3A;
  }
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const BookCard = styled.div`
  background-color: #FFDAB9;
  border: 2px solid #966F33;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #4A4A4A;
`;

const BookInfo = styled.p`
  margin: 5px 0;
  color: #4A4A4A;
`;

const EnhancedReadingLog = () => {
  const [books, setBooks] = useState({});
  const [currentBook, setCurrentBook] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [minutesRead, setMinutesRead] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const logs = await getReadingLogs();
      const bookMap = logs.reduce((acc, log) => {
        if (!acc[log.book_title]) {
          acc[log.book_title] = {
            totalPagesRead: 0,
            totalMinutesRead: 0,
            logs: []
          };
        }
        acc[log.book_title].totalPagesRead += log.pages_read;
        acc[log.book_title].totalMinutesRead += log.minutes_read;
        acc[log.book_title].logs.push(log);
        return acc;
      }, {});
      setBooks(bookMap);
    } catch (error) {
      console.error('読書ログの取得に失敗しました:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReadingLog({
        book_title: currentBook,
        pages_read: parseInt(pagesRead),
        minutes_read: parseInt(minutesRead),
        date: new Date().toISOString()
      });
      alert('読書ログが追加されました！');
      setCurrentBook('');
      setPagesRead('');
      setMinutesRead('');
      fetchLogs();
    } catch (error) {
      alert('エラーが発生しました: ' + error.message);
    }
  };

  const handleContinueReading = (bookTitle) => {
    setCurrentBook(bookTitle);
    const book = books[bookTitle];
    setPagesRead(book.totalPagesRead.toString());
  };

  const handleDeleteLog = async (logId) => {
    try {
      await deleteReadingLog(logId);
      alert('読書ログが削除されました！');
      fetchLogs();
    } catch (error) {
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <Container>
      <Title>読書ログ</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={currentBook}
          onChange={(e) => setCurrentBook(e.target.value)}
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
        <Select value={minutesRead} onChange={(e) => setMinutesRead(e.target.value)} required>
          <option value="">読書時間を選択</option>
          {Array.from({ length: 12 }, (_, i) => (i + 1) * 10).map(minutes => (
            <option key={minutes} value={minutes}>{minutes}分</option>
          ))}
        </Select>
        <Button type="submit">記録する</Button>
      </Form>
      <BookList>
        {Object.entries(books).map(([title, book]) => (
          <BookCard key={title}>
            <BookTitle>{title}</BookTitle>
            <BookInfo>読んだページ: {book.totalPagesRead}</BookInfo>
            <BookInfo>総読書時間: {book.totalMinutesRead}分</BookInfo>
            <Button onClick={() => handleContinueReading(title)}>続きを読む</Button>
            {book.logs.map((log) => (
              <div key={log.id}>
                <BookInfo>日付: {new Date(log.date).toLocaleDateString()}</BookInfo>
                <BookInfo>ページ: {log.pages_read}</BookInfo>
                <BookInfo>時間: {log.minutes_read}分</BookInfo>
                <Button onClick={() => handleDeleteLog(log.id)}>削除</Button>
              </div>
            ))}
          </BookCard>
        ))}
      </BookList>
    </Container>
  );
};

export default EnhancedReadingLog;