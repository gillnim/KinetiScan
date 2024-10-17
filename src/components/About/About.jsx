// src/components/About.jsx
import React from 'react';
import './About.scss';

const About = () => {
  return (
    <section id="about" className="about">
      <h2 className="about__title">About KinetiScan</h2>
      <p className="about__description">
        KinetiScan is an AI-driven tool that helps you monitor joint movements, analyze your range of motion, and track your progress over time.
      </p>
    </section>
  );
};

export default About;
