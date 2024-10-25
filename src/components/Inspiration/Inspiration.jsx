// src/components/Inspiration/Inspiration.jsx

import React from 'react';
import './Inspiration.scss';
import inspo from '../../assets/images/inspiration.webp'
import grad from '../../assets/images/grad.jpg'

const Inspiration = () => {
  return (
    <section className="inspiration">
      <h2 className="inspiration__title">Our Story</h2>
      <div className="inspiration__section">
        <p className="inspiration__story">
            KinetiScan was born out of a personal journey. Following a knee injury from a snowboarding accident that required surgery, I found myself struggling to keep up with physiotherapy during COVID-19. Many of my appointments consisted of practicing exercises at home, with my therapist checking my form and progress. I realized how valuable a tool like KinetiScan would have been during this time. It would have allowed me to practice at home and share my progress with my therapist remotely, saving in-person visits for only the most essential check-ins.
        </p>
        <img src={inspo} alt="knee injury" className="inspiration__image" />
      </div>
      <div className="inspiration__section">
        <img src={grad} alt="grad photo" className="inspiration__image" />
        <p className="inspiration__background">
            As a recent Systems Engineering graduate with a background in robotics, I have always been fascinated by movement mechanics. My work with robotic arms deepened my understanding of how much effort and precision is involved in replicating human movements. Drawing from my experiences in vector calculus and robotics, I combined this knowledge with the capabilities of MediaPipe to create KinetiScan – a tool designed to make progress tracking accessible, flexible, and precise for anyone committed to improving mobility.
        </p>
      </div>
    </section>
  );
};

export default Inspiration;
