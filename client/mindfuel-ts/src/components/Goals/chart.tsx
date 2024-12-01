import React from 'react';
import { Bar } from 'react-chartjs-2';

const GoalChart: React.FC<{ goals: any[] }> = ({ goals }) => {
  const data = {
    labels: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    datasets: [
      {
        label: 'Goals Achieved',
        data: [
          goals.filter((g) => g.type === 'daily' && g.achieved).length,
          goals.filter((g) => g.type === 'weekly' && g.achieved).length,
          goals.filter((g) => g.type === 'monthly' && g.achieved).length,
          goals.filter((g) => g.type === 'yearly' && g.achieved).length,
        ],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default GoalChart;
