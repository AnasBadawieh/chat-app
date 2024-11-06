// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:5000/api/auth/verify', { headers: { Authorization: token } });
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} logout={logout} />
      <Switch>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login setAuth={setIsAuthenticated} />}
        </Route>
        <Route path="/register">
          {isAuthenticated ? <Redirect to="/" /> : <Register setAuth={setIsAuthenticated} />}
        </Route>
        <Route path="/">
          {isAuthenticated ? <Chat /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;