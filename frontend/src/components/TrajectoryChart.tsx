import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale, Filler, ChartOptions, ChartData, ChartDataset } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale, Filler);

interface PositionData {
  timestamp: string;
  x: number;
  y: number;
  velocity: number;
  acceleration: number;
}

interface TrajectoryData {
  trajectory_id: string;
  vehicle_id: string;
  positions: PositionData[];
}

interface TrajectoryChartProps {
  data: TrajectoryData[];
  selectedVehicle: string[];
  velocityRange: [number, number];
  accelerationRange: [number, number];
}

const TrajectoryChart: React.FC<TrajectoryChartProps> = ({ data, selectedVehicle, velocityRange, accelerationRange }) => {
  const filteredData = data.filter(traj => 
    selectedVehicle.includes(traj.vehicle_id) &&
    traj.positions.some(pos => pos.velocity >= velocityRange[0] && pos.velocity <= velocityRange[1]) &&
    traj.positions.some(pos => pos.acceleration >= accelerationRange[0] && pos.acceleration <= accelerationRange[1])
  );

  const colors = [
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(201, 203, 207, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)'
  ];

  const chartData: ChartData<'line'> = {
    labels: Array.from(new Set(filteredData.flatMap(traj => traj.positions.map(pos => pos.timestamp)))),
    datasets: filteredData.flatMap((traj, index): ChartDataset<'line'>[] => [
      {
        label: `${traj.vehicle_id} Velocity`,
        data: traj.positions.map(pos => ({ x: new Date(pos.timestamp).getTime(), y: pos.velocity })),
        borderColor: colors[index % colors.length],
        backgroundColor: `${colors[index % colors.length]}77`,
        fill: false,
        parsing: false, // ensure we handle the date parsing ourselves
      },
      {
        label: `${traj.vehicle_id} Acceleration`,
        data: traj.positions.map(pos => ({ x: new Date(pos.timestamp).getTime(), y: pos.acceleration })),
        borderColor: colors[(index + 1) % colors.length],
        backgroundColor: `${colors[(index + 1) % colors.length]}77`,
        fill: false,
        parsing: false, // ensure we handle the date parsing ourselves
      }
    ])
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Trajectory Data',
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute' as const,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TrajectoryChart;