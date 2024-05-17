import {
  defaultBarChartHeightWidth,
  defaultBubbleChartHeightWidth,
  defaultDoughnutChartHeightWidth,
  defaultLineChartHeightWidth,
  defaultPieChartHeightWidth,
  defaultPolarAreaChartHeightWidth,
  defaultRadarHeightWidth,
  defaultScatterChartHeightWidth,
} from '@/constants';
import { ChartCustomType } from '@/types/charts';

export const randomColor = () => {
  `rgb(,${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
  const redColor = Math.round(Math.random() * 255);
  const greenColor = Math.round(Math.random() * 255);
  const blueColor = Math.round(Math.random() * 255);
  return {
    backgroundColor: `rgba(${redColor},${greenColor},${blueColor},0.2)`,
    borderColor: `rgba(${redColor},${greenColor},${blueColor},1)`,
  };
};

export const getChartDefaultWidthHeight = (
  type: ChartCustomType | undefined,
) => {
  switch (true) {
    case type === ChartCustomType.BAR:
      return defaultBarChartHeightWidth;
    case type === ChartCustomType.BUBBLE:
      return defaultBubbleChartHeightWidth;
    case type === ChartCustomType.DOUGHNUT:
      return defaultDoughnutChartHeightWidth;
    case type === ChartCustomType.LINE:
      return defaultLineChartHeightWidth;
    case type === ChartCustomType.PIE:
      return defaultPieChartHeightWidth;
    case type === ChartCustomType.POLARAREA:
      return defaultPolarAreaChartHeightWidth;
    case type === ChartCustomType.RADAR:
      return defaultRadarHeightWidth;
    case type === ChartCustomType.SCATTER:
      return defaultScatterChartHeightWidth;
    default:
      return {
        h: 5,
        w: 12,
      };
  }
};
