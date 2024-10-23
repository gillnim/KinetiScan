import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import standing from '../../assets/images/nimrat.jpeg';
import test from '../../assets/images/test.jpg';

const PoseTrackerImageTest = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const maxWidth = 800; 
  const maxHeight = 600; 

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

    // Function to draw lines between two landmarks
    const drawLine = (start, end, color) => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(start.x * canvasElement.width, start.y * canvasElement.height);
      canvasCtx.lineTo(end.x * canvasElement.width, end.y * canvasElement.height);
      canvasCtx.strokeStyle = color;
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
    };

    // Calculate the angle between three points (p1, p2, p3)
    const calculateAngle = (p1, p2, p3) => {
      const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
      let angle = Math.abs((radians * 180) / Math.PI);
      if (angle > 180) {
        angle = 360 - angle;
      }
      return angle;
    };

    pose.onResults((results) => {
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;

        // landmarks
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftElbow = landmarks[13];
        const rightElbow = landmarks[14];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];

        drawLine(leftShoulder, leftElbow, 'blue'); 
        drawLine(leftShoulder, leftHip, 'blue'); 
        drawLine(rightShoulder, rightElbow, 'blue'); 
        drawLine(rightShoulder, rightHip, 'blue'); 

        // Calculate shoulder angles
        const leftShoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
        const rightShoulderAngle = calculateAngle(rightElbow, rightShoulder, rightHip);

        // Draw landmarks and display angles
        results.poseLandmarks.forEach((landmark, index) => {
          const { x, y } = landmark;

          // Draw the landmark points
          canvasCtx.beginPath();
          canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 2, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'red';
          canvasCtx.fill();

          // Add the landmark index
          canvasCtx.font = '12px Arial';
          canvasCtx.fillStyle = 'white';
          canvasCtx.fillText(index, x * canvasElement.width + 5, y * canvasElement.height - 5);
        });

        const displayTextWithBounds = (text, x, y) => {
          const textWidth = canvasCtx.measureText(text).width;
          const padding = 10; 

          if (x + textWidth > canvasElement.width - padding) {
            x = canvasElement.width - textWidth - padding;
          }
          if (y - 20 < padding) {
            y = 20 + padding;
          }

          canvasCtx.fillText(text, x, y);
        };

        canvasCtx.font = '16px Arial';
        canvasCtx.fillStyle = 'orange';

        displayTextWithBounds(
          `Left: ${leftShoulderAngle.toFixed(2)}°`,
          leftShoulder.x * canvasElement.width,
          leftShoulder.y * canvasElement.height - 20
        );
        displayTextWithBounds(
          `Right: ${rightShoulderAngle.toFixed(2)}°`,
          rightShoulder.x * canvasElement.width,
          rightShoulder.y * canvasElement.height - 20
        );

        console.log(`Left Shoulder Angle: ${leftShoulderAngle.toFixed(2)}°`);
        console.log(`Right Shoulder Angle: ${rightShoulderAngle.toFixed(2)}°`);
      } else {
        console.log('No pose landmarks detected.');
      }
    });

    const detectPoseOnImage = async () => {
      try {
        if (imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0) {
          const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
          let scaledWidth = imageElement.naturalWidth;
          let scaledHeight = imageElement.naturalHeight;

          if (scaledWidth > maxWidth || scaledHeight > maxHeight) {
            if (scaledWidth > maxWidth) {
              scaledWidth = maxWidth;
              scaledHeight = scaledWidth / aspectRatio;
            }
            if (scaledHeight > maxHeight) {
              scaledHeight = maxHeight;
              scaledWidth = scaledHeight * aspectRatio;
            }
          }

          canvasElement.width = scaledWidth;
          canvasElement.height = scaledHeight;
          canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

          console.log('Image drawn on canvas.');
          console.log(`Image dimensions: ${imageElement.naturalWidth} x ${imageElement.naturalHeight}`);
          console.log(`Canvas dimensions: ${canvasElement.width} x ${canvasElement.height}`);

          await pose.send({ image: canvasElement });
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
      <h1>Pose Detection and Shoulder Angle Analysis</h1>

      <img
        ref={imageRef}
        src={test}
        alt="Test"
        style={{ display: imageLoaded ? 'none' : 'block' }}
      />

      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default PoseTrackerImageTest;
