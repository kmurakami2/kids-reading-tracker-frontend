import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
`;

const ListItem = styled.li`
  background-color: #F4A460;
  margin-bottom: 10px;
  padding: 15px;
  border: 2px solid #966F33;
  border-radius: 5px;
`;

const ItemTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const ItemInfo = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const RewardList = ({ rewards }) => {
  return (
    <List>
      {rewards.map((reward) => (
        <ListItem key={reward.id}>
          <ItemTitle>{reward.name}</ItemTitle>
          <ItemInfo>{reward.description}</ItemInfo>
          <ItemInfo>必要ポイント: {reward.points_required}</ItemInfo>
        </ListItem>
      ))}
    </List>
  );
};

export default RewardList;