import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

const Sky = styled.div`
  width: 100%;
  height: 80%;
  background-color: #87CEEB;
`;

const Ground = styled.div`
  width: 100%;
  height: 20%;
  background-color: #8B5A2B;
`;

const GrassLayer = styled.div`
  width: 100%;
  height: 5%;
  background-color: #567D46;
  position: absolute;
  bottom: 20%;
`;

const AnimatedSun = styled(animated.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FFD700;
  position: absolute;
  top: 10%;
  right: 10%;
`;

const Background = () => {
  const sunAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'translateY(-20px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <BackgroundContainer>
      <Sky />
      <AnimatedSun style={sunAnimation} />
      <GrassLayer />
      <Ground />
    </BackgroundContainer>
  );
};

export default Background;