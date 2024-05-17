import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { LineChartItem } from '@/types/charts';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const LineChart = (props: BaseChartProps<LineChartItem>) => {
  const { chart } = props;
  return <Line data={chart.data} options={chart.options} />;
};
