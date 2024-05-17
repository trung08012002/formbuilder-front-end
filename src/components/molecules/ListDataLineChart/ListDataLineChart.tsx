import { Group, Select } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetDateDataStatisticQuery } from '@/redux/api/responseApi';
import {
  ChartCustomType,
  DataDateInColumn,
  LineChartItem,
} from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export interface GroupedData {
  [answer: string]: { date: string; rate: number }[];
}

export const ListDataLineChart = (props: ListDataChartProps<LineChartItem>) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetDateDataStatisticQuery(formId);
  if (!data) return <div>No data statistic!</div>;

  const handleChangeLineChart = (columnData: DataDateInColumn) => {
    const labels = Array.from(
      new Set(columnData.data.map((value) => value.date)),
    );
    const answers = Array.from(
      new Set(columnData.data.map((value) => value.answer)),
    );

    const lineChart: ChartData<ChartCustomType.LINE> = {
      labels: labels,
      datasets: answers.map((answer) => {
        const color = randomColor();
        return {
          label: `${answer}`,
          data: labels.map((label) => {
            const data = columnData.data.find(
              (value) => value.answer === answer && value.date === label,
            );
            return data?.rate ? Number(data.rate) : Number(0.0);
          }),
          backgroundColor: color.backgroundColor,
          borderColor: color.borderColor,
          borderWidth: 1,
        };
      }),
    };
    handleChangeData(lineChart);
  };

  return (
    <Group>
      <Select
        data={data.map((columnData) => ({
          value: columnData.columnId,
          label: columnData.column,
        }))}
        onChange={(value) => {
          handleChangeLineChart(
            data.find((columnData) => columnData.columnId === value)!,
          );
        }}
      />
    </Group>
  );
};
