import { PolarArea } from 'react-chartjs-2';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import { PolarAreaChartItem } from '@/types';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const PolarAreaChart = (props: BaseChartProps<PolarAreaChartItem>) => {
  const { chart } = props;

  return <PolarArea data={chart.data} options={chart.options} />;
};
