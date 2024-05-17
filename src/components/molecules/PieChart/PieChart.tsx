import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend,Tooltip } from 'chart.js';

import { PieChartItem } from '@/types';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = (props: BaseChartProps<PieChartItem>) => {
  const { chart } = props;

  return <Pie data={chart.data} options={chart.options} />;
};
