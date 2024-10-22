// PoseTracker.jsx
import React, { useEffect, useRef } from 'react';
import { Pose } from '@mediapipe/pose';

const POSE_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10],
  [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19],
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23],
  [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29],
  [28, 30], [29, 31], [30, 32]
];

// Custom function to draw landmarks and connectors
const drawLandmarks = (ctx, landmarks, color = 'white', radius = 5) => {
  for (const landmark of landmarks) {
    const { x, y } = landmark;
    ctx.beginPath();
    ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
};

const drawConnectors = (ctx, landmarks, connections, color = 'aqua', lineWidth = 2) => {
  for (const [i, j] of connections) {
    const landmark1 = landmarks[i];
    const landmark2 = landmarks[j];
    ctx.beginPath();
    ctx.moveTo(landmark1.x * ctx.canvas.width, landmark1.y * ctx.canvas.height);
    ctx.lineTo(landmark2.x * ctx.canvas.width, landmark2.y * ctx.canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
};

const PoseTracker = ({ videoRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    if (!videoElement || !canvasElement) return;

    // Initialize MediaPipe Pose
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 0,  // Set to 0 to reduce load for debugging
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const detectPose = async () => {
      if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        // Resize the canvas to match the video element
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        await pose.send({ image: videoElement });
        requestAnimationFrame(detectPose);
      } else {
        console.warn('Video dimensions are still 0, waiting...');
      }
    };

    videoElement.onloadedmetadata = () => {
      console.log('Video metadata loaded:', videoElement.videoWidth, videoElement.videoHeight);
      detectPose();  // Start pose detection once video dimensions are available
    };

    return () => {
      videoElement.srcObject?.getTracks().forEach((track) => track.stop());
    };
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      width="640"
      height="480"
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default PoseTracker;
