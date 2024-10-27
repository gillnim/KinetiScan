import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRealignClick = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h1>404: Page Not Found</h1>
      <p>Oops! Seems like this joint’s a bit out of alignment.</p>
      <button className="realign-button" onClick={handleRealignClick}>
        Realign
      </button>
      <div className="jokes">
        <p>Don’t worry, we’ll work on your range of motion and get you back on track!</p>
        <p>Maybe this page skipped leg day?</p>
        <p>404: No flex here, but we’ll help you find your way.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
