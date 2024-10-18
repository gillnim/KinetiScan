// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <nav className="navbar">
        <Link to = "/" className="navbar__logo">KinetiScan</Link>
        <ul className="navbar__links">
            <li><a href='/#about'>About</a></li>
            <li><Link to = "/login">Login</Link></li>
            <li><a href="/tutorial">Tutorial</a></li>
        </ul>
    </nav>
  );
};

export default Header;
