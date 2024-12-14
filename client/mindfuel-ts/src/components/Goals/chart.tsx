import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoalChart: React.FC<{ goals: any[] }> = ({ goals }) => {
  const data = {
    labels: ['1 - Low', '2', '3 - Medium', '4', '5 - High'],
    datasets: [
      {
        label: 'Goals by Rating',
        data: [
          goals.filter((g) => g.rating === 1).length,
          goals.filter((g) => g.rating === 2).length,
          goals.filter((g) => g.rating === 3).length,
          goals.filter((g) => g.rating === 4).length,
          goals.filter((g) => g.rating === 5).length,
        ],
        backgroundColor: [
          'rgba(255,99,132,0.6)', // Red
          'rgba(255,159,64,0.6)', // Orange
          'rgba(255,205,86,0.6)', // Yellow
          'rgba(75,192,192,0.6)', // Green
          'rgba(54,162,235,0.6)', // Blue
        ],
      },
    ],
  };

  return <Bar data={data} />;
};

export default GoalChart;
