// src/components/Header.jsx
import React from 'react';
import './Header.scss';

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">KinetiScan</div>
      <ul className="navbar__links">
        <li><a href="#about">About</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/tutorial">Tutorial</a></li>
      </ul>
    </nav>
  );
};

export default Header;
