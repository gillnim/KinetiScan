// Camera.jsx
import React, { useRef, useState, useEffect } from 'react';
import PoseTracker from '../PoseTracker/PoseTracker.jsx';

const Camera = () => {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream; // Attach the stream to video
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded with dimensions:', videoRef.current.videoWidth, videoRef.current.videoHeight);
            setStreaming(true); // Set streaming to true after the metadata is fully loaded
          };
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
          setErrorMessage('Error accessing the camera. Please check permissions.');
        });
    } else {
      setErrorMessage('MediaDevices not supported in this browser.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      let stream = videoRef.current.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(track => track.stop());  // Stop all camera tracks
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  return (
    <div>
      <h1>KinetiScan Camera</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div style={{ position: 'relative', width: '640px', height: '480px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}  // Black background for clarity
        ></video>

        {streaming && <PoseTracker videoRef={videoRef} />} {/* Pose detection only starts when streaming */}
      </div>

      <div>
        {!streaming ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}
      </div>
    </div>
  );
};

export default Camera;
