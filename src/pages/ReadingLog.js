import React from 'react';
import styled from 'styled-components';
import EnhancedReadingLog from '../components/EnhancedReadingLog';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #8B5A2B;
  min-height: 100vh;
`;

const ReadingLog = ({ user }) => {
  return (
    <PageContainer>
      <EnhancedReadingLog user={user} />
    </PageContainer>
  );
};

export default ReadingLog;