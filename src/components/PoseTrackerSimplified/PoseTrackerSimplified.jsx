// PoseTrackerSimplified.jsx (with WebGL disabled)
import React, { useEffect, useRef } from 'react';
import { Pose } from '@mediapipe/pose';

const PoseTrackerSimplified = ({ videoRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');

    if (!videoElement || !canvasElement) return;

    // Initialize MediaPipe Pose with CPU inference
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    // Disable WebGL and force CPU inference by using `useCpuInference` option
    pose.setOptions({
      modelComplexity: 0, 
      smoothLandmarks: true,
      enableSegmentation: false,
      useCpuInference: true, // Force MediaPipe to use CPU instead of WebGL
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const detectPose = async () => {
      try {
        if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
          // Resize canvas to match video dimensions
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;

          await pose.send({ image: videoElement });

          requestAnimationFrame(detectPose);  // Continue pose detection loop
        } else {
          console.warn('Video dimensions not valid, retrying...');
        }
      } catch (error) {
        console.error('Error during pose detection:', error);
      }
    };

    videoElement.onloadedmetadata = () => {
      console.log('Starting pose detection with CPU inference...');
      detectPose();
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

export default PoseTrackerSimplified;
