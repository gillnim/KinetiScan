import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        KinetiScan
      </NavLink>

      {/* Hamburger Menu for Mobile */}
      <div className="navbar__menu" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Links (conditionally shown in mobile) */}
      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
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
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => 
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Connect
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
