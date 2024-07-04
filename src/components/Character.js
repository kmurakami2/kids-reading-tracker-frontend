import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const CharacterContainer = styled(animated.div)`
  width: 60px;
  height: 120px;
`;

const Steve = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4c7f99;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background-color: #e9c29d;
  }
`;

const Creeper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #50c878;
`;

const Character = ({ type, style }) => {
  const [clicked, setClicked] = useState(false);

  const animation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 1000 },
  });

  const clickAnimation = useSpring({
    transform: clicked ? 'translateY(-50px)' : 'translateY(0px)',
    config: { tension: 300, friction: 10 },
  });

  const handleInteraction = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <CharacterContainer 
      style={{ ...style, ...animation, ...clickAnimation }}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {type === 'steve' ? <Steve /> : <Creeper />}
    </CharacterContainer>
  );
};

export default Character;