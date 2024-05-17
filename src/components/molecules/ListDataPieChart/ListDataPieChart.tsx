import { Group, Select } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetStatisticQuery } from '@/redux/api/responseApi';
import { ChartCustomType, DataInColumn, PieChartItem } from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export const ListDataPieChart = (props: ListDataChartProps<PieChartItem>) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetStatisticQuery(formId);
  if (!data) return <div>No data statistic!</div>;
  const handleChangePieChart = (columnData: DataInColumn) => {
    const pieChart: ChartData<ChartCustomType.PIE> = {
      labels: columnData.data.map((answerAndRate) => answerAndRate.answer),
      datasets: [
        {
          label: `${columnData.column}`,
          data: columnData.data.map((answerAndRate) => answerAndRate.rate),
          backgroundColor: columnData.data.map(
            () => randomColor().backgroundColor,
          ),
        },
      ],
    };
    handleChangeData(pieChart);
  };

  return (
    <Group>
      <Select
        data={data.map((columnData) => ({
          value: columnData.columnId,
          label: columnData.column,
        }))}
        onChange={(value) => {
          handleChangePieChart(
            data.find((columnData) => columnData.columnId === value)!,
          );
        }}
      />
    </Group>
  );
};
