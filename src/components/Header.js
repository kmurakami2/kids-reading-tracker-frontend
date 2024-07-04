import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: rgba(74, 74, 74, 0.8);
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: 'Minecraft', sans-serif;
  margin-left: 20px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #FFD700;
    transform: scale(1.1);
  }
`;

const LogoutButton = styled.button`
  background-color: #FF6347;
  color: white;
  border: none;
  padding: 5px 10px;
  font-family: 'Minecraft', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #FF4500;
    transform: scale(1.1);
  }
`;

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HeaderContainer>
      <NavLink to="/">ホーム</NavLink>
      {user && <NavLink to="/reading-log">読書記録</NavLink>}
      {user && <LogoutButton onClick={handleLogout}>ログアウト</LogoutButton>}
    </HeaderContainer>
  );
};

export default Header;