import { Group, Select, useCombobox } from '@mantine/core';
import type { ChartData } from 'chart.js';

import { useGetStatisticQuery } from '@/redux/api/responseApi';
import { BarChartItem, ChartCustomType, DataInColumn } from '@/types/charts';
import { randomColor } from '@/utils';

import { ListDataChartProps } from '../ListDataChart';

export const ListDataBarChart = (props: ListDataChartProps<BarChartItem>) => {
  const { handleChangeData, formId } = props;
  const { data } = useGetStatisticQuery(formId);
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.selectFirstOption(),
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  if (!data) return <div>No data statistic!</div>;
  const handleChangeBarChartData = (columnData: DataInColumn) => {
    const colors = columnData.data.map(() => randomColor());
    const barChartData: ChartData<ChartCustomType.BAR> = {
      labels: columnData.data.map((answerAndRate) => answerAndRate.answer),
      datasets: [
        {
          label: `Bar Chart for ${columnData.column}`,
          data: columnData.data.map((answerAndRate) => answerAndRate.rate),
          backgroundColor: colors.map((color) => color.backgroundColor),
          borderColor: colors.map((color) => color.borderColor),
          borderWidth: 1,
        },
      ],
    };
    handleChangeData(barChartData);
  };
  return (
    <Group>
      <Select
        data={data.map((columnData) => ({
          value: columnData.columnId,
          label: columnData.column,
        }))}
        onChange={(value) => {
          handleChangeBarChartData(
            data.find((columnData) => columnData.columnId === value)!,
          );
        }}
      />
    </Group>
  );
};
