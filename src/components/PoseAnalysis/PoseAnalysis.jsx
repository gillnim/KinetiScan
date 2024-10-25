import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pose } from '@mediapipe/pose';
import axios from 'axios';
import AnglePlot from '../AnglePlot/AnglePlot.jsx';

const PoseAnalysis = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [leftShoulderAngles, setLeftShoulderAngles] = useState([]);
  const [rightShoulderAngles, setRightShoulderAngles] = useState([]);
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  useEffect(() => {
    // Fetch initial angle data from backend
    const fetchAngles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/angles');
        const angleData = response.data;
        setLeftShoulderAngles(angleData.map(data => data.leftShoulderAngle));
        setRightShoulderAngles(angleData.map(data => data.rightShoulderAngle));
      } catch (error) {
        console.error('Error fetching angle data:', error);
      }
    };

    fetchAngles();
  }, []);

  useEffect(() => {
    if (!imageUrl) return;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    const imageElement = imageRef.current;
    imageElement.crossOrigin = 'anonymous';

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.75,
    });

    const drawLine = (start, end, color) => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(start.x * canvasElement.width, start.y * canvasElement.height);
      canvasCtx.lineTo(end.x * canvasElement.width, end.y * canvasElement.height);
      canvasCtx.strokeStyle = color;
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
    };

    const calculateAngle = (p1, p2, p3) => {
      const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
      let angle = Math.abs((radians * 180) / Math.PI);
      if (angle > 180) {
        angle = 360 - angle;
      }
      return angle;
    };

    const postAngleData = (leftAngle, rightAngle) => {
      const angleData = {
        timestamp: new Date().toISOString(),
        leftShoulderAngle: leftAngle,
        rightShoulderAngle: rightAngle,
      };

      axios
        .post('http://localhost:8080/angles', angleData)
        .then(() => console.log('Angle data posted successfully'))
        .catch((error) => console.error('Error posting angle data:', error));
    };

    pose.onResults((results) => {
      if (!imageElement || !canvasElement) return;

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;

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

        const leftShoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
        const rightShoulderAngle = calculateAngle(rightElbow, rightShoulder, rightHip);

        setLeftShoulderAngles((prevAngles) => [...prevAngles, leftShoulderAngle]);
        setRightShoulderAngles((prevAngles) => [...prevAngles, rightShoulderAngle]);

        postAngleData(leftShoulderAngle, rightShoulderAngle);

        landmarks.forEach((landmark, index) => {
          const { x, y } = landmark;
          canvasCtx.beginPath();
          canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 2, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'red';
          canvasCtx.fill();
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
        canvasCtx.fillStyle = 'red';

        displayTextWithBounds(
          `Left Shoulder Angle: ${leftShoulderAngle.toFixed(2)}°`,
          leftShoulder.x * canvasElement.width,
          leftShoulder.y * canvasElement.height - 20
        );
        displayTextWithBounds(
          `Right Shoulder Angle: ${rightShoulderAngle.toFixed(2)}°`,
          rightShoulder.x * canvasElement.width,
          rightShoulder.y * canvasElement.height - 20
        );

        console.log(`Left Shoulder Angle: ${leftShoulderAngle.toFixed(2)}°`);
        console.log(`Right Shoulder Angle: ${rightShoulderAngle.toFixed(2)}°`);
      }
    });

    const detectPoseOnImage = async () => {
      try {
        const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
        let scaledWidth = imageElement.naturalWidth;
        let scaledHeight = imageElement.naturalHeight;

        if (scaledWidth > 800 || scaledHeight > 600) {
          if (scaledWidth > 800) {
            scaledWidth = 800;
            scaledHeight = scaledWidth / aspectRatio;
          }
          if (scaledHeight > 600) {
            scaledHeight = 600;
            scaledWidth = scaledHeight * aspectRatio;
          }
        }

        canvasElement.width = scaledWidth;
        canvasElement.height = scaledHeight;
        canvasCtx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

        await pose.send({ image: canvasElement });
      } catch (error) {
        console.error('Error during pose detection:', error);
      }
    };

    imageElement.onload = () => {
      setImageLoaded(true);
      detectPoseOnImage();
    };

    imageElement.onerror = () => {
      console.error('Error loading image.');
    };
  }, [imageUrl]);

  return (
    <div>
      <h1>Pose Detection and Shoulder Angle Analysis</h1>
      {imageUrl && (
        <div>
          <img
            ref={imageRef}
            src={`http://localhost:8080${imageUrl}`}
            alt="Uploaded"
            style={{ display: imageLoaded ? 'none' : 'block' }}
          />
          <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
          <AnglePlot leftShoulderAngles={leftShoulderAngles} rightShoulderAngles={rightShoulderAngles} />
        </div>
      )}
    </div>
  );
};

export default PoseAnalysis;
