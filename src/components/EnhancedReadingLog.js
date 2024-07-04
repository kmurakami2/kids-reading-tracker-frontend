import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { addReadingLog, getReadingLogs, deleteReadingLog } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #8B4513;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const Title = styled.h1`
  color: #FFD700;
  text-align: center;
  font-family: 'Minecraft', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px #000000, -2px -2px #000000, 2px -2px #000000, -2px 2px #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 15px;
  border: 3px solid #4A4A4A;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #C6C6C6;
  color: #4A4A4A;
  font-family: 'Minecraft', sans-serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
`;

const Select = styled.select`
  padding: 15px;
  border: 3px solid #4A4A4A;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #C6C6C6;
  color: #4A4A4A;
  font-family: 'Minecraft', sans-serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Minecraft', sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 5px 0 #45a049;

  &:hover {
    background-color: #45a049;
    transform: translateY(2px);
    box-shadow: 0 3px 0 #2E7D32;
  }

  &:active {
    transform: translateY(5px);
    box-shadow: none;
  }
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const BookCard = styled.div`
  background-color: #C6C6C6;
  border: 3px solid #4A4A4A;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 0 #4A4A4A;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 0 #4A4A4A;
  }
`;

const BookTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #4A4A4A;
  font-family: 'Minecraft', sans-serif;
  font-size: 1.2rem;
`;

const BookInfo = styled.p`
  margin: 10px 0;
  color: #4A4A4A;
  font-family: 'Minecraft', sans-serif;
  font-size: 1rem;
`;

const LogList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const LogItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid #4A4A4A;
  border-radius: 5px;
  background-color: #A9A9A9;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-20px) rotate(-5deg); }
`;

const Character = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  z-index: -1;
  ${props => css`
    animation: ${float} 8s ease-in-out infinite ${props.delay || '0s'};
  `}
`;

const imageList = [
  'bookcase.png', 'box.png', 'box2.png', 'chicken.png', 'chicken2.png',
  'creeper.png', 'creeper2.png', 'enderman.png', 'pickel.png', 'pig.png',
  'skeleton.png', 'skeleton2.png', 'skeleton3.png', 'skeleton4.png',
  'steve.png', 'steve2.png', 'steve3.png', 'steve4.png', 'sword.png', 'zombi.png'
];

const getRandomImage = () => {
  return imageList[Math.floor(Math.random() * imageList.length)];
};

const EnhancedReadingLog = ({ user }) => {
  const [books, setBooks] = useState({});
  const [currentBook, setCurrentBook] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [minutesRead, setMinutesRead] = useState('');
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    fetchLogs();
    setRandomImages([
      getRandomImage(),
      getRandomImage(),
    ]);
  }, []);

  const fetchLogs = async () => {
    try {
      const logs = await getReadingLogs();
      const bookMap = logs.reduce((acc, log) => {
        if (!acc[log.book_title]) {
          acc[log.book_title] = {
            totalPagesRead: 0,
            totalMinutesRead: 0,
            readCount: 0,
            logs: []
          };
        }
        acc[log.book_title].totalPagesRead += log.pages_read;
        acc[log.book_title].totalMinutesRead += log.minutes_read;
        acc[log.book_title].readCount += 1;
        acc[log.book_title].logs.push(log);
        return acc;
      }, {});
      setBooks(bookMap);
    } catch (error) {
      console.error('読書記録の取得に失敗しました:', error);
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
      alert('読書記録が追加されました！');
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
    setPagesRead('');
    setMinutesRead('');
  };

  const handleDeleteLog = async (logId) => {
    try {
      await deleteReadingLog(logId);
      alert('読書記録が削除されました！');
      fetchLogs();
    } catch (error) {
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <Container>
      <Character image={`/images/${randomImages[0]}`} style={{ top: '10%', left: '-100px' }} />
      <Character image={`/images/${randomImages[1]}`} style={{ bottom: '10%', right: '-100px' }} delay="4s" />
      <Title>読書記録</Title>
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
            <BookInfo>読書回数: {book.readCount}回</BookInfo>
            <Button onClick={() => handleContinueReading(title)}>続きを読む</Button>
            <LogList>
              {book.logs.map((log) => (
                <LogItem key={log.id}>
                  <BookInfo>日付: {new Date(log.date).toLocaleDateString()}</BookInfo>
                  <BookInfo>ページ: {log.pages_read}</BookInfo>
                  <BookInfo>時間: {log.minutes_read}分</BookInfo>
                  <Button onClick={() => handleDeleteLog(log.id)}>削除</Button>
                </LogItem>
              ))}
            </LogList>
          </BookCard>
        ))}
      </BookList>
    </Container>
  );
};

export default EnhancedReadingLog;