import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

const LogItem = styled.div`
  background-color: #F4A460;
  border: 2px solid #966F33;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0 0 5px 0;
  color: #4A4A4A;
`;

const Info = styled.p`
  margin: 5px 0;
  color: #4A4A4A;
`;

const ReadingLogList = ({ logs }) => {
  return (
    <ListContainer>
      <h2>読書ログ</h2>
      {logs.length === 0 ? (
        <p>読書ログがありません。</p>
      ) : (
        logs.map((log) => (
          <LogItem key={log.id}>
            <Title>{log.book_title}</Title>
            <Info>ページ数: {log.pages_read}</Info>
            <Info>読書時間: {log.minutes_read}分</Info>
            <Info>日付: {new Date(log.date).toLocaleDateString()}</Info>
          </LogItem>
        ))
      )}
    </ListContainer>
  );
};

export default ReadingLogList;