// src/pages/Homepage.jsx
import React from 'react';
import './Homepage.scss';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Inspiration from '../../components/Inspiration/Inspiration';

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Inspiration/>
      <About />
    </div>
  );
};

export default Homepage;
