import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  background-color: #F4A460;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const StatItem = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #4A4A4A;
`;

const ReadingLogStats = ({ stats }) => {
  return (
    <StatsContainer>
      <StatItem>総読書冊数: {stats.total_books}冊</StatItem>
      <StatItem>総読書ページ数: {stats.total_pages}ページ</StatItem>
      <StatItem>総読書時間: {stats.total_minutes}分 ({Math.floor(stats.total_minutes / 60)}時間{stats.total_minutes % 60}分)</StatItem>
    </StatsContainer>
  );
};

export default ReadingLogStats;