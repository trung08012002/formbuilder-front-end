import { Group, Select } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetStatisticQuery } from '@/redux/api/responseApi';
import {
  ChartCustomType,
  DataInColumn,
  PolarAreaChartItem,
} from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export const ListDataPolarAreaChart = (
  props: ListDataChartProps<PolarAreaChartItem>,
) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetStatisticQuery(formId);
  if (!data) return <div>No data statistic!</div>;
  const handleChangePolarAreaChart = (columnData: DataInColumn) => {
    const polarAreaChart: ChartData<ChartCustomType.POLARAREA> = {
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
    handleChangeData(polarAreaChart);
  };

  return (
    <Group>
      <Select
        data={data.map((columnData) => ({
          value: columnData.columnId,
          label: columnData.column,
        }))}
        onChange={(value) => {
          handleChangePolarAreaChart(
            data.find((columnData) => columnData.columnId === value)!,
          );
        }}
      />
    </Group>
  );
};
