import { ChartItem } from '@/types';
import { cn } from '@/utils';

import { FactoryChart } from '../FactoryChart/FactoryChart';
import { ListDataChart, ListDataChartProps } from '../ListDataChart';
import { RemoveItem } from '../RemoveItem';

export interface ChartElementProps extends ListDataChartProps {
  editingChart: ChartItem | undefined;
  removeItem: (id: string) => void;
}

export const ChartElement = (props: ChartElementProps) => {
  const {
    chart,
    editingChart,
    updateChartItems,
    handleChangeData,
    outSize,
    setOutSize,
    formId,
    removeItem,
  } = props;

  return (
    <div
      key={chart.id}
      data-grid={chart.gridSize}
      className={cn(
        'flex w-full cursor-move flex-col justify-center rounded-md border-[3px] border-solid border-transparent bg-white px-2',
        {
          'react-draggable-dragging border-[3px] border-blue-500 !will-change-auto':
            chart.id === editingChart?.id,
        },
      )}
    >
      <FactoryChart chart={chart} isActive={chart.id === editingChart?.id} />
      {chart.id === editingChart?.id && (
        <>
          <ListDataChart
            chart={chart}
            updateChartItems={updateChartItems}
            handleChangeData={handleChangeData}
            isActive={false}
            outSize={outSize}
            setOutSize={setOutSize}
            formId={formId}
          />

          <RemoveItem removeItem={removeItem} id={editingChart.id} />
        </>
      )}
    </div>
  );
};
