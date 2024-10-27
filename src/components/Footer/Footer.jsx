// src/components/Footer/Footer.jsx

import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#about" className="footer__link">About</a>
        <a href="#about" className="footer__link">Features</a>
        <a href="/tutorial" className="footer__link">Tutorial</a>
        <a href="/contact" className="footer__link">Contact</a>
      </div>
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} KinetiScan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
