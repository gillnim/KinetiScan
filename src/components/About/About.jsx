import React from 'react';
import './About.scss';
import JointImage from '../../assets/images/shoulder.jpg'; 
import FeatureCard from '../FeatureCard/FeatureCard.jsx';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__content">
        <h2 className="about__title">About KinetiScan</h2>
        <p className="about__description">
        KinetiScan empowers individuals dedicated to improving their joint health and mobility. Ideal for tracking rehabilitation progress, enhancing flexibility, or simply maintaining joint health, KinetiScan provides detailed, real-time insights and tracking tools that support your movement goals. With the ability to analyze joint angles, track improvements, and monitor your mobility journey over time, KinetiScan brings precision and encouragement to every step forward.
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
        <FeatureCard 
          title="Report Sharing" 
          description="Easily export your progress reports and share them with your healthcare provider to keep them informed and involved in your recovery journey."
          icon="📑" 
        />
        <FeatureCard 
          title="Goal Setting and Achievement" 
          description="Set custom goals and receive progress notifications, celebrating each step of your journey toward better joint health and flexibility."
          icon="🎯" 
        />
      </div>

      <div className="about__is-this-for-you">
        <h3 className="about__section-title">Is This Tool for You?</h3>
        <p className="about__description">
          Are you someone who:
        </p>
        <ul className="about__list">
          <li>✔️ Is recovering from an injury?</li>
          <li>✔️ Wants to improve flexibility and mobility?</li>
          <li>✔️ Is working on joint health and range of motion?</li>
          <li>✔️ Is tracking rehabilitation progress over time?</li>
        </ul>
        <p className="about__description">
          If any of the above applies to you, or if you simply want to track your mobility journey,
        </p>
        <Link to="/login" className="about__cta-button">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default About;
