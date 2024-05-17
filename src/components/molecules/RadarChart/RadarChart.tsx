import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import { RadarChartItem } from '@/types';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const RadarChart = (props: BaseChartProps<RadarChartItem>) => {
  const { chart } = props;

  return <Radar data={chart.data} options={chart.options} />;
};
