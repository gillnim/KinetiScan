// src/components/Hero.jsx
import React from 'react';
import './Hero.scss';
import heroimage from '../../assets/images/Hero.png'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Track Your Joint Movements with KinetiScan</h1>
        <p className="hero__subtitle">Monitor, analyze, and improve your recovery or performance with real-time insights.</p>
        <button className="hero__cta">Get Started</button>
      </div>
      <div className="hero__image">
        <img src={heroimage} alt="Joint Tracking" />
      </div>
    </section>
  );
};

export default Hero;
