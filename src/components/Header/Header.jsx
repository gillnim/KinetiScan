import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/login'); // Redirect to login page
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        KinetiScan
      </NavLink>

      <div className="navbar__menu" onClick={toggleMenu}>
        &#9776;
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        <li>
          <a href="/#about">About</a>
        </li>
        {!isLoggedIn ? (
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
        ) : (
          <li>
            <button onClick={handleLogout} className="navbar__logout">
              Logout
            </button>
          </li>
        )}
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
