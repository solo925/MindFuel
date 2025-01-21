import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Goal {
  rating: number;
}

const GoalChart: React.FC<{ goals: Goal[] }> = ({ goals }) => {
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
        borderColor: [
          'rgba(255,99,132,1)', // Red
          'rgba(255,159,64,1)', // Orange
          'rgba(255,205,86,1)', // Yellow
          'rgba(75,192,192,1)', // Green
          'rgba(54,162,235,1)', // Blue
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Count: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: 'rgba(200,200,200,0.3)' },
      },
      y: {
        ticks: { color: '#333' },
        grid: { color: 'rgba(200,200,200,0.3)' },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-blue-600 mb-4">Goals Overview</h2>
      {goals.length > 0 ? (
        <div className="h-64">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p className="text-gray-500 text-center">No goals available to display.</p>
      )}
    </div>
  );
};

export default GoalChart;
