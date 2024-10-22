import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import standing from '../../assets/images/shoulder-test.jpg'; 

const PoseTrackerImageTest = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    const imageElement = imageRef.current;

    if (!imageElement || !canvasElement) return;

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: false,
      useCpuInference: true,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.75,
    });

    // Log pose detection results
    pose.onResults((results) => {
      console.log('Pose detection results received.');
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

      if (results.poseLandmarks) {
        console.log('Pose landmarks detected:', results.poseLandmarks);

        // Draw landmarks
        results.poseLandmarks.forEach((landmark, index) => {
          const { x, y } = landmark;
          canvasCtx.beginPath();
          canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'red';
          canvasCtx.fill();

          // Optional: Label each landmark
          canvasCtx.font = '12px Arial';
          canvasCtx.fillStyle = 'blue';
          canvasCtx.fillText(index, x * canvasElement.width, y * canvasElement.height - 10);
        });
      } else {
        console.log('No pose landmarks detected.');
      }
    });

    const detectPoseOnImage = async () => {
      try {
        if (imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0) {
          canvasElement.width = 640;
          canvasElement.height = 480;
          canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);
          
          console.log('Image drawn on canvas.');
          console.log(`Image dimensions: ${imageElement.naturalWidth} x ${imageElement.naturalHeight}`);
          console.log(`Canvas dimensions: ${canvasElement.width} x ${canvasElement.height}`);

          await pose.send({ image: canvasElement });
          console.log('Sending image to MediaPipe Pose for detection...');
        }
      } catch (error) {
        console.error('Error during pose detection:', error);
      }
    };

    imageElement.onload = () => {
      console.log('Image successfully loaded');
      setImageLoaded(true);
      detectPoseOnImage();
    };

    imageElement.onerror = () => {
      console.error('Error loading image.');
    };
  }, []);

  return (
    <div>
      <h1>Pose Detection Test on Static Image</h1>

      <img
        ref={imageRef}
        src={standing} 
        alt="Test"
        style={{ display: imageLoaded ? 'none' : 'block' }}
      />

      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', width: '640px', height: '480px' }}
      ></canvas>
    </div>
  );
};

export default PoseTrackerImageTest;
