// src/pages/Homepage.jsx
import React from 'react';
import './Homepage.scss';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
    </div>
  );
};

export default Homepage;
