import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import { DoughnutChartItem } from '@/types/charts';

import { BaseChartProps } from '../FactoryChart/FactoryChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = (props: BaseChartProps<DoughnutChartItem>) => {
  const { chart } = props;
  return <Doughnut data={chart.data} options={chart.options} />;
};
