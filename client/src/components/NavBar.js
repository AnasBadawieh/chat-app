// client/src/components/NavBar.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';


const NavBar = ({ isAuthenticated, logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <nav>
      <h1>Chat App</h1>
      <ul>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;