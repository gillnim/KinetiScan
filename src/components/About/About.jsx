import React from 'react';
import './About.scss';
import JointImage from '../../assets/images/shoulder.jpg'; 
import FeatureCard from '../FeatureCard/FeatureCard.jsx';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__content">
        <h2 className="about__title">About KinetiScan</h2>
        <p className="about__description">
          KinetiScan helps users track and analyze joint movements and range of motion. Whether you're recovering from an injury or improving flexibility, KinetiScan provides detailed insights and progress tracking to support your movement goals.
        </p>
      </div>
      
      <div className="about__cards">
        <FeatureCard 
          title="Real-Time Tracking" 
          description="Capture and analyze movements in real-time to enhance joint flexibility and performance."
          icon="🕒" 
        />
        <FeatureCard 
          title="Range of Motion Analysis" 
          description="Evaluate joint angles and get detailed feedback on your range of motion."
          icon="📐" 
        />
        <FeatureCard 
          title="Progress Tracking" 
          description="Track recovery and performance over time to stay on top of your movement goals."
          icon="📊" 
        />
      </div>
    </section>
  );
};

export default About;
