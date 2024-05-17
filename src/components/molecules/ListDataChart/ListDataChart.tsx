// eslint-disable-next-line simple-import-sort/imports
import { ChartItem } from '@/types/charts';
import {
  isBarChart,
  isDoughnutChart,
  isLineChart,
  isPieChart,
  isPolarAreaChart,
  isRadarChart,
} from '../FactoryChart/FactoryChart';
import { ListDataBarChart } from '../ListDataBarChart';
import { useCallback } from 'react';
import { ListDataLineChart } from '../ListDataLineChart';
import { ListDataPolarAreaChart } from '../ListDataPolarAreaChart';
import { ListDataPieChart } from '../ListDataPieChart';
import { ListDataDoughnutChart } from '../ListDataDoughnutChart';
import { ListDataRadarChart } from '../ListDataRadarChart';
import { cn } from '@/utils';

export interface ListDataChartProps<T extends ChartItem = ChartItem> {
  chart: T;
  updateChartItems: (item: T) => void;
  handleChangeData: (data: T['data']) => void;
  isActive: boolean;
  formId: number;
  outSize: boolean;
  setOutSize: (value: boolean) => void;
}

export const ListDataChart = (props: ListDataChartProps) => {
  const { chart, ...rest } = props;

  const renderContent = useCallback(() => {
    switch (true) {
      case isBarChart(chart):
        return <ListDataBarChart chart={chart} {...rest} />;
      case isLineChart(chart):
        return <ListDataLineChart chart={chart} {...rest} />;
      case isPolarAreaChart(chart):
        return <ListDataPolarAreaChart chart={chart} {...rest} />;
      case isPieChart(chart):
        return <ListDataPieChart chart={chart} {...rest} />;
      case isDoughnutChart(chart):
        return <ListDataDoughnutChart chart={chart} {...rest} />;
      case isRadarChart(chart):
        return <ListDataRadarChart chart={chart} {...rest} />;
      default:
        return <></>;
    }
  }, [chart]);

  return (
    <div
      className={cn(
        'visible absolute -top-12 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 shadow-md',
        { invisible: rest.outSize },
      )}
    >
      <div className='rounded bg-white'>{renderContent()}</div>
    </div>
  );
};
