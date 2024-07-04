import React, { useState } from 'react';
import styled from 'styled-components';
import { login, register } from '../services/api';

const AuthContainer = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(244, 164, 96, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #966F33;
  border-radius: 5px;
  font-family: 'Minecraft', sans-serif;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #567D46;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: 'Minecraft', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4A6D3A;
  }
`;

const ErrorMessage = styled.p`
  color: #FF6347;
  text-align: center;
  font-family: 'Minecraft', sans-serif;
`;

const Auth = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let response;
      if (isLogin) {
        response = await login(email, password);
      } else {
        response = await register(username, email, password);
      }
      setUser({ id: response.userId, email, token: response.token });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <AuthContainer>
        <p>ログイン中: {user.email}</p>
        <Button onClick={handleLogout}>ログアウト</Button>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <form onSubmit={handleAuth}>
        {!isLogin && (
          <Input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{isLogin ? 'ログイン' : '新規登録'}</Button>
      </form>
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '新規登録へ' : 'ログインへ'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AuthContainer>
  );
};

export default Auth;