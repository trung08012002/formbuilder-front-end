import { Group, Select, useCombobox } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetStatisticQuery } from '@/redux/api/responseApi';
import {
  ChartCustomType,
  DataInColumn,
  DoughnutChartItem,
} from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export const ListDataDoughnutChart = (
  props: ListDataChartProps<DoughnutChartItem>,
) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetStatisticQuery(formId);
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.selectFirstOption(),
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  if (!data) return <div>No data statistic!</div>;
  const handleChangeDoughnutChart = (columnData: DataInColumn) => {
    const colors = columnData.data.map(() => randomColor());
    const doughnutChart: ChartData<ChartCustomType.DOUGHNUT> = {
      labels: columnData.data.map((answerAndRate) => answerAndRate.answer),
      datasets: [
        {
          label: `${columnData.column}`,
          data: columnData.data.map((answerAndRate) => answerAndRate.rate),
          backgroundColor: colors.map((color) => color.backgroundColor),
          borderColor: colors.map((color) => color.borderColor),
        },
      ],
    };
    handleChangeData(doughnutChart);
  };

  return (
    <Group>
      <Select
        data={data.map((columnData) => ({
          value: columnData.columnId,
          label: columnData.column,
        }))}
        onChange={(value) => {
          handleChangeDoughnutChart(
            data.find((columnData) => columnData.columnId === value)!,
          );
        }}
      />
    </Group>
  );
};
