import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #966F33;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 こうちゃんの読書日記 All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;