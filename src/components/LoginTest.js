import React, { useState } from 'react';
import { login } from '../services/api';

const LoginTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setMessage(`ログイン成功: ${response.message}`);
    } catch (error) {
      setMessage(`ログイン失敗: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>ログインテスト</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">ログイン</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginTest;