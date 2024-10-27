import React from 'react';
import './TutorialPage.scss';

function TutorialPage() {
  return (
    <div>
      <h1 className="title">How To Use</h1>
      <div className="iframe-container">
        <iframe
          src="https://scribehow.com/embed/KinetiScan_How__To__GSOb-n64S7itiBO_FVhSnQ?as=scrollable"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default TutorialPage;