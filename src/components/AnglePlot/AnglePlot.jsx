// AnglePlot.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const AnglePlot = ({ leftShoulderAngles, rightShoulderAngles }) => {
  const data = {
    labels: leftShoulderAngles.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Left Shoulder Angle',
        data: leftShoulderAngles,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Right Shoulder Angle',
        data: rightShoulderAngles,
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 180 },
    },
  };

  return <Line data={data} options={options} />;
};

export default AnglePlot;
