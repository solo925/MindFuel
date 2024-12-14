import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from "react-chartjs-2";



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoalBarGraph: React.FC<{ goals: any[] }> = ({ goals }) => {
  

    const data = {
      labels: goals.map((goal) => goal.title), 
      datasets: [
        {
          label: 'Achieved',
          data: goals.map((goal) => goal.rating/5*100 || 5/5*100),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: `target ${5/5 * 100}%`,
          data: goals.map(() => 5/5*100), 
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
        },
      ],
    };
  
    const options:any = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
      },
      scales: {
        x: {
          ticks: { autoSkip: false },
        },
        y: {
          beginAtZero: true,
          max: 5/5*100,
          stepSize: 1, 
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };

  export default GoalBarGraph;
  