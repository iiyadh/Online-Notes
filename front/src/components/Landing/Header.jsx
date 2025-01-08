import React from 'react';
import './styles/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h2>StickyNotes</h2>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/login" className="login-button">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
