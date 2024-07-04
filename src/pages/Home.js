import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #8B4513;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px; // ツールバーの高さ分だけ下げる
`;

const Content = styled.div`
  text-align: center;
  color: white;
  z-index: 10;
  width: 90%;
  max-width: 600px;
  margin-top: 5vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Minecraft', sans-serif;
  color: #FFFFFF;
  text-shadow: 2px 2px #000000, -2px -2px #000000, 2px -2px #000000, -2px 2px #000000;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Minecraft', sans-serif;
  color: #FFFFFF;
  text-shadow: 1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  font-family: 'Minecraft', sans-serif;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
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

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-15px) rotate(-5deg); }
`;

const Character = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  ${props => css`
    animation: ${float} 6s ease-in-out infinite ${props.delay || '0s'};
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

const Home = ({ user, setUser }) => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    setRandomImages([
      getRandomImage(),
      getRandomImage(),
      getRandomImage(),
      getRandomImage()
    ]);
  }, []);

  return (
    <HomeContainer>
      <Auth user={user} setUser={setUser} />
      <Content>
        <Title>こうちゃんの読書記録</Title>
        <Subtitle>今日の読書を記録しよう！</Subtitle>
        {user && <Button to="/reading-log">記録する</Button>}
      </Content>
      <Character image={`/images/${randomImages[0]}`} style={{ top: '15%', left: '15%' }} />
      <Character image={`/images/${randomImages[1]}`} style={{ bottom: '15%', left: '15%' }} delay="2s" />
      <Character image={`/images/${randomImages[2]}`} style={{ top: '15%', right: '15%' }} delay="1s" />
      <Character image={`/images/${randomImages[3]}`} style={{ bottom: '15%', right: '15%' }} delay="3s" />
    </HomeContainer>
  );
};

export default Home;