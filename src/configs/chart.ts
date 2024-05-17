import { AiOutlineRadarChart } from 'react-icons/ai';
import { BiDoughnutChart } from 'react-icons/bi';
import { FaChartBar } from 'react-icons/fa';
import { IoPieChart } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { LuScatterChart } from 'react-icons/lu';
import { PiChartPolarBold } from 'react-icons/pi';
// import { RiBubbleChartFill } from 'react-icons/ri';
import { RiLineChartLine } from 'react-icons/ri';

import { ChartCustomType } from '@/types';

export const CHARTS = {
  BAR_CHART: {
    icon: FaChartBar,
    type: ChartCustomType.BAR,
    isDisabled: false,
  },
  // BUBBLE_CHART: {
  //   icon: RiBubbleChartFill,
  //   type: ChartCustomType.BUBBLE,
  //   isDisabled: true,
  // },
  DOUGHNUT_CHART: {
    icon: BiDoughnutChart,
    type: ChartCustomType.DOUGHNUT,
    isDisabled: false,
  },
  LINE_CHART: {
    icon: RiLineChartLine,
    type: ChartCustomType.LINE,
    isDisabled: false,
  },
  PIE_CHART: {
    icon: IoPieChart,
    type: ChartCustomType.PIE,
    isDisabled: false,
  },
  POLARAREA_CHART: {
    icon: PiChartPolarBold,
    type: ChartCustomType.POLARAREA,
    isDisabled: false,
  },
  RADAR_CHART: {
    icon: AiOutlineRadarChart,
    type: ChartCustomType.RADAR,
    isDisabled: true,
  },
  SCATTER_CHART: {
    icon: LuScatterChart,
    type: ChartCustomType.SCATTER,
    isDisabled: false,
  },
};

export interface ElementChartGroupType {
  title: string;
  elements: {
    element: {
      icon: IconType;
      type: ChartCustomType;
      isDisabled: boolean;
    };
  }[];
}

export const ElementChartList: ElementChartGroupType[] = [
  {
    title: 'Frequently used',
    elements: [
      { element: CHARTS.BAR_CHART },
      // { element: CHARTS.BUBBLE_CHART },
      { element: CHARTS.DOUGHNUT_CHART },
      { element: CHARTS.LINE_CHART },
      { element: CHARTS.PIE_CHART },
      { element: CHARTS.POLARAREA_CHART },
      { element: CHARTS.RADAR_CHART },
      // { element: CHARTS.SCATTER_CHART },
    ],
  },
];
