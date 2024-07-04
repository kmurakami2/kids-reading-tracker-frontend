import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GoalContainer = styled.div`
  background-color: #F4A460;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const GoalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  border: 2px solid #966F33;
  background-color: #FFF;
  color: #4A4A4A;
  border-radius: 5px;
`;

const GoalButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  background-color: #567D46;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4A6D3A;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.percent}%;
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.5s ease-in-out;
`;

const ReadingGoal = ({ totalPages }) => {
  const [goal, setGoal] = useState(0);
  const [inputGoal, setInputGoal] = useState('');

  useEffect(() => {
    const savedGoal = localStorage.getItem('readingGoal');
    if (savedGoal) {
      setGoal(parseInt(savedGoal, 10));
    }
  }, []);

  const handleSetGoal = () => {
    const newGoal = parseInt(inputGoal, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
      localStorage.setItem('readingGoal', newGoal.toString());
      setInputGoal('');
    }
  };

  const progress = Math.min((totalPages / goal) * 100, 100);

  return (
    <GoalContainer>
      <h3>読書目標</h3>
      {goal > 0 ? (
        <>
          <p>目標: {goal}ページ</p>
          <p>進捗: {totalPages}ページ ({Math.round(progress)}%)</p>
          <ProgressBar>
            <Progress percent={progress} />
          </ProgressBar>
        </>
      ) : (
        <p>目標を設定してください</p>
      )}
      <GoalInput
        type="number"
        value={inputGoal}
        onChange={(e) => setInputGoal(e.target.value)}
        placeholder="目標ページ数を入力"
      />
      <GoalButton onClick={handleSetGoal}>目標を設定</GoalButton>
    </GoalContainer>
  );
};

export default ReadingGoal;