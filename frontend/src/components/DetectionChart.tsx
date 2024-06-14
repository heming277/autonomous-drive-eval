// src/components/DetectionChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DetectionChartProps {
  data: Array<{ object_id: string; confidence: number }>;
}

const DetectionChart: React.FC<DetectionChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.object_id),
    datasets: [
      {
        label: 'Confidence',
        data: data.map(item => item.confidence),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1
      }
    }
  };

  return (
    <div style={{ height: '400px', padding: '20px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DetectionChart;