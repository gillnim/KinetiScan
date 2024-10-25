// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        KinetiScan
      </NavLink>
      <ul className="navbar__links">
        <li>
          <a href="/#about">About</a>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => 
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tutorial"
            className={({ isActive }) => 
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Tutorial
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
