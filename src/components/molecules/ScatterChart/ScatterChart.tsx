import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { ScatterChartItem } from '@/types';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const ScatterChart = (props: BaseChartProps<ScatterChartItem>) => {
  const { chart } = props;
  return <Scatter data={chart.data} options={chart.options} />;
};
