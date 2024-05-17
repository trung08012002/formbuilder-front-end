import {
  BarChartItem,
  BubbleChartItem,
  ChartCustomType,
  ChartItem,
  DoughnutChartItem,
  LineChartItem,
  PieChartItem,
  PolarAreaChartItem,
  RadarChartItem,
  ScatterChartItem,
} from '@/types/charts';

import { BarChart } from '../BarChart';
import { DoughnutChart } from '../DoughnutChart';
import { LineChart } from '../LineChart';
import { PieChart } from '../PieChart';
import { PolarAreaChart } from '../PolarAreaChart';
import { RadarChart } from '../RadarChart';
import { ScatterChart } from '../ScatterChart';

export interface BaseChartProps<T extends ChartItem = ChartItem> {
  chart: T;
  isActive: boolean;
}

export const FactoryChart = (props: BaseChartProps) => {
  const { chart, ...rest } = props;
  switch (true) {
    case isBarChart(chart):
      return <BarChart chart={chart} {...rest} />;
    case isLineChart(chart):
      return <LineChart chart={chart} {...rest} />;
    case isScatterChart(chart):
      return <ScatterChart chart={chart} {...rest} />;
    case isPolarAreaChart(chart):
      return <PolarAreaChart chart={chart} {...rest} />;
    case isPieChart(chart):
      return <PieChart chart={chart} {...rest} />;
    case isDoughnutChart(chart):
      return <DoughnutChart chart={chart} {...rest} />;
    case isRadarChart(chart):
      return <RadarChart chart={chart} {...rest} />;
    default:
      return <></>;
  }
};

export function isBarChart(chart: ChartItem): chart is BarChartItem {
  return chart.type === ChartCustomType.BAR;
}

export function isBubbleChart(chart: ChartItem): chart is BubbleChartItem {
  return chart.type === ChartCustomType.BUBBLE;
}

export function isPieChart(chart: ChartItem): chart is PieChartItem {
  return chart.type === ChartCustomType.PIE;
}

export function isScatterChart(chart: ChartItem): chart is ScatterChartItem {
  return chart.type === ChartCustomType.SCATTER;
}

export function isLineChart(chart: ChartItem): chart is LineChartItem {
  return chart.type === ChartCustomType.LINE;
}

export function isDoughnutChart(chart: ChartItem): chart is DoughnutChartItem {
  return chart.type === ChartCustomType.DOUGHNUT;
}

export function isPolarAreaChart(
  chart: ChartItem,
): chart is PolarAreaChartItem {
  return chart.type === ChartCustomType.POLARAREA;
}

export function isRadarChart(chart: ChartItem): chart is RadarChartItem {
  return chart.type === ChartCustomType.RADAR;
}
