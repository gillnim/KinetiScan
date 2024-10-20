// src/components/FeatureCard.jsx
import React from 'react';
import './FeatureCard.scss';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </div>
  );
};

export default FeatureCard;
