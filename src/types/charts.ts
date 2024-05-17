import type { ChartData, ChartOptions, ChartType } from 'chart.js';

import { GridSize } from './elements';

export interface AnswerAndRate {
  rate: number;
  answer: string;
}

export interface DataInColumn {
  columnId: string;
  column: string;
  data: AnswerAndRate[];
}

export interface AnswerAndRateDate {
  rate: number;
  answer: string;
  date: string;
}

export interface DataDateInColumn {
  columnId: string;
  column: string;
  data: AnswerAndRateDate[];
}

export interface ChartDataAndType extends DataInColumn {
  type: ChartType;
}

export interface BaseChartElement<T extends ChartType> {
  id: string;
  type: T;
  gridSize: GridSize;
  options: ChartOptions<T>;
  data: ChartData<T>;
}

export enum ChartCustomType {
  BAR = 'bar',
  LINE = 'line',
  SCATTER = 'scatter',
  BUBBLE = 'bubble',
  PIE = 'pie',
  DOUGHNUT = 'doughnut',
  POLARAREA = 'polarArea',
  RADAR = 'radar',
}

export type BarChartItem = BaseChartElement<ChartCustomType.BAR>;
export type LineChartItem = BaseChartElement<ChartCustomType.LINE>;
export type ScatterChartItem = BaseChartElement<ChartCustomType.SCATTER>;
export type BubbleChartItem = BaseChartElement<ChartCustomType.BUBBLE>;
export type PieChartItem = BaseChartElement<ChartCustomType.PIE>;
export type DoughnutChartItem = BaseChartElement<ChartCustomType.DOUGHNUT>;
export type PolarAreaChartItem = BaseChartElement<ChartCustomType.POLARAREA>;
export type RadarChartItem = BaseChartElement<ChartCustomType.RADAR>;
export type ChartItem =
  | BarChartItem
  | LineChartItem
  | ScatterChartItem
  | PieChartItem
  | BubbleChartItem
  | RadarChartItem
  | PieChartItem
  | DoughnutChartItem
  | PolarAreaChartItem;
