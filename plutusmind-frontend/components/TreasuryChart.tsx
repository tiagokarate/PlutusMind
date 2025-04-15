import { Card, Title } from '@tremor/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface TreasuryChartProps {
  data: number[];
  labels: string[];
}

export default function TreasuryChart({ data, labels }: TreasuryChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Valor do Tesouro',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução do PlutusTreasury',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <Card>
      <Title>PlutusTreasury</Title>
      <div className="mt-4">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
} 