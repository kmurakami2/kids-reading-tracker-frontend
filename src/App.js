import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { setAuthToken } from './services/api';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';
import ReadingLog from './pages/ReadingLog';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      setAuthToken(storedUser.token);
      setUser(storedUser);
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthToken(userData.token);
    } else {
      localStorage.removeItem('user');
      setAuthToken(null);
    }
  };

  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header user={user} setUser={handleSetUser} />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={handleSetUser} />} />
          <Route 
            path="/reading-log" 
            element={user ? <ReadingLog user={user} /> : <Navigate to="/" />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;