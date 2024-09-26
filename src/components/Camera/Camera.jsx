import React, { useRef, useState } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setStreaming(true); // Make sure streaming is true
          mediaRecorderRef.current = new MediaRecorder(stream); // Create media recorder
        })
        .catch((error) => console.error('Error accessing the camera:', error));
    }
  };

  const stopCamera = () => {
    let stream = videoRef.current.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setStreaming(false); // Set streaming to false when camera is stopped
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);  // Start recording and set state to true
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);  // Save video URL for playback
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);  // Stop recording and set state to false
    }
  };

  return (
    <div>
      <h1>KinetiScan</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: '500px', height: 'auto' }}></video>

      <div>
        {!streaming ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}
      </div>

      {streaming && (
        <div>
          {!recording ? (
            <button onClick={startRecording}>Start Recording</button>
          ) : (
            <button onClick={stopRecording}>Stop Recording</button>
          )}
        </div>
      )}

      {videoURL && (
        <div>
          <h2>Recorded Video:</h2>
          <video src={videoURL} controls style={{ width: '500px', height: 'auto' }}></video>
        </div>
      )}
    </div>
  );
};

export default Camera;
