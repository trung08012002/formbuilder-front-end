import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { BarChartItem } from '@/types/charts';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const BarChart = (props: BaseChartProps<BarChartItem>) => {
  const { chart } = props;
  return <Bar data={chart.data} options={chart.options} />;
};
