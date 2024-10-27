// AnglePlot.jsx
import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './AnglePlot.scss'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnglePlot = ({ leftShoulderAngles, rightShoulderAngles, dates }) => {
  const chartRef = useRef(null);

  const parsedDates = dates.map(date => new Date(date));

  const data = {
    labels: parsedDates,
    datasets: [
      {
        label: 'Left Shoulder Angle',
        data: leftShoulderAngles,
        borderColor: 'blue',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Right Shoulder Angle',
        data: rightShoulderAngles,
        borderColor: 'green',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd, yyyy',
          displayFormats: {
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: true,
        max: 180,
        title: {
          display: true,
          text: 'Angle (degrees)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}°`,
        },
      },
    },
  };

  // Function to handle chart download
  const downloadChart = () => {
    const chart = chartRef.current;
    if (!chart) return;

    const url = chart.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'KinetiScan_Progress_Chart.png';
    link.click();
  };

  return (
    <div>
      <Line ref={chartRef} data={data} options={options} />
      <button className='download-button' onClick={downloadChart} style={{ cursor: 'pointer' }}>
        Download Chart
      </button>
    </div>
  );
};

export default AnglePlot;
