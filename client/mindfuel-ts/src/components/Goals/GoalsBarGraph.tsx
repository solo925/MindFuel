import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Goal {
  title: string;
  rating: number;
}

const GoalBarGraph: React.FC<{ goals: Goal[] }> = ({ goals }) => {
  const data = {
    labels: goals.map((goal) => goal.title),
    datasets: [
      {
        label: 'Achieved',
        data: goals.map((goal) => (goal.rating / 5) * 100 || (5 / 5) * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: `Target ${(5 / 5) * 100}%`,
        data: goals.map(() => (5 / 5) * 100),
        backgroundColor: 'rgba(200, 200, 200, 0.6)',
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          color: '#333',
        },
        grid: {
          color: 'rgba(200,200,200,0.3)',
        },
      },
      y: {
        beginAtZero: true,
        max: (5 / 5) * 100,
        stepSize: 1,
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(200,200,200,0.3)',
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-blue-600 mb-4">Goal Achievements</h2>
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

export default GoalBarGraph;
