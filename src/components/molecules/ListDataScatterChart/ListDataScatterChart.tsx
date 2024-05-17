import { Button } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetDateDataStatisticQuery } from '@/redux/api/responseApi';
import {
  ChartCustomType,
  DataInColumn,
  ScatterChartItem,
} from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export const ListDataScatterChart = (
  props: ListDataChartProps<ScatterChartItem>,
) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetDateDataStatisticQuery(formId);
  if (!data) return <div>No data statistic!</div>;
  const handleChangeScatterChart = (columnData: DataInColumn) => {
    const scatterChart: ChartData<ChartCustomType.SCATTER> = {
      labels: columnData.data.map((answerAndRate) => answerAndRate.answer),
      datasets: [
        {
          label: `Line Chart for ${columnData.column}`,
          data: columnData.data.map((answerAndRate) => answerAndRate.rate),
          backgroundColor: randomColor().backgroundColor,
        },
      ],
    };
    handleChangeData(scatterChart);
  };

  return (
    <div>
      {data.map((columnData) => (
        <Button
          key={columnData.columnId}
          onClick={() => handleChangeScatterChart(columnData)}
        >
          {columnData.column}
        </Button>
      ))}
    </div>
  );
};
