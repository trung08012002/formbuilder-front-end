import { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { useClickOutside } from '@mantine/hooks';
import { v4 as uuidv4 } from 'uuid';

import {
  defaultBarChartOptions,
  defaultBubbleChartOptions,
  defaultDoughnutChartOptions,
  defaultLineChartOptions,
  defaultPieChartOptions,
  defaultPolarAreaOption,
  defaultRadarOption,
  defaultScatterChartOptions,
} from '@/constants/charts';
import { FactoryChart } from '@/molecules/FactoryChart/FactoryChart';
import { ListDataChart } from '@/molecules/ListDataChart';
import { RemoveItem } from '@/molecules/RemoveItem';
import { ChartCustomType, ChartItem } from '@/types/charts';
import { cn, getChartDefaultWidthHeight, randomColor } from '@/utils';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface ResponsiveGridLayoutProps {
  currentElementType: ChartCustomType;
  isDisabled: boolean;
}

const FLEETING_INDEX = 'fleeting';

export const ResponsiveGridLayoutChart = ({
  currentElementType,
  isDisabled,
}: ResponsiveGridLayoutProps) => {
  const [chartElements, setChartElements] = useState<ChartItem[]>([]);
  const [editingChart, setEditingChart] = useState<ChartItem>();
  const { formId } = useParams();
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<{
    lg: Layout[];
    md: Layout[];
    sm: Layout[];
    xs: Layout[];
    xxs: Layout[];
  }>({ lg: [], md: [], sm: [], xs: [], xxs: [] });
  const [outSize, setOutSize] = useState(false);

  function getLayout(element: ChartItem, layouts: Layout[]) {
    const foundlayout = layouts.find((layout) => element.id === layout.i);
    return {
      x: foundlayout!.x,
      y: foundlayout!.y,
      w: foundlayout!.w,
      h: foundlayout!.h,
    };
  }

  function getElement(elementItems: ChartItem[], layouts: Layout[]) {
    return elementItems.map((elementItem) => {
      const gridSize = getLayout(elementItem, layouts);
      return { ...elementItem, gridSize: gridSize };
    });
  }

  const removeItem = (id: string) => {
    setChartElements(chartElements.filter((element) => element.id !== id));
    setEditingChart(undefined);
  };
  const handleChangeData = (data: ChartItem['data']) => {
    setEditingChart({ ...editingChart, data: data } as ChartItem);
    updateItem({ ...editingChart, data: data } as ChartItem);
    setEditingChart(undefined);
  };
  const updateItem = (item: ChartItem) => {
    setChartElements(
      chartElements.map((element) => {
        if (element.id !== editingChart!.id) return element;
        return item;
      }),
    );
  };
  const createItem = (
    type: string,
    currentItem: Layout,
  ): ChartItem | undefined => {
    const uid = uuidv4();
    const getGridSize = (currentItem: Layout) => ({
      x: currentItem.x,
      y: currentItem.y,
      w: currentItem.w,
      h: currentItem.h,
    });
    switch (type) {
      case ChartCustomType.BAR:
        return {
          id: uid,
          type: ChartCustomType.BAR,
          gridSize: getGridSize(currentItem),
          options: defaultBarChartOptions,
          data: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
            ],
            datasets: [
              {
                label: 'Dataset 1',
                data: [8, 4, 7, 9, 1, 2, 3],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 3, 2, 5],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          },
        };
      case ChartCustomType.LINE:
        return {
          id: uid,
          type: ChartCustomType.LINE,
          gridSize: getGridSize(currentItem),
          options: defaultLineChartOptions,
          data: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
            ],
            datasets: [
              {
                label: 'Dataset 1',
                data: [8, 4, 7, 9, 1, 2, 3],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 3, 2, 5],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          },
        };
      case ChartCustomType.SCATTER:
        return {
          id: uid,
          type: ChartCustomType.SCATTER,
          gridSize: getGridSize(currentItem),
          options: defaultScatterChartOptions,
          data: { labels: [], datasets: [] },
        };
      case ChartCustomType.BUBBLE:
        return {
          id: uid,
          type: ChartCustomType.BUBBLE,
          gridSize: getGridSize(currentItem),
          options: defaultBubbleChartOptions,
          data: { labels: [], datasets: [] },
        };
      case ChartCustomType.PIE:
        return {
          id: uid,
          type: ChartCustomType.PIE,
          gridSize: getGridSize(currentItem),
          options: defaultPieChartOptions,
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        };
      case ChartCustomType.DOUGHNUT:
        return {
          id: uid,
          type: ChartCustomType.DOUGHNUT,
          gridSize: getGridSize(currentItem),
          options: defaultDoughnutChartOptions,
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        };
      case ChartCustomType.POLARAREA:
        return {
          id: uid,
          type: ChartCustomType.POLARAREA,
          gridSize: getGridSize(currentItem),
          options: defaultPolarAreaOption,
          data: {
            labels: ['Model Data '],
            datasets: [
              {
                label: 'Model Data',
                data: [0.5, 0.3],
                backgroundColor: [randomColor().backgroundColor],
              },
            ],
          },
        };
      case ChartCustomType.RADAR:
        return {
          id: uid,
          type: ChartCustomType.RADAR,
          gridSize: getGridSize(currentItem),
          options: defaultRadarOption,
          data: {
            labels: [
              'Thing 1',
              'Thing 2',
              'Thing 3',
              'Thing 4',
              'Thing 5',
              'Thing 6',
              'Thing 7',
            ],
            datasets: [
              {
                label: '# of Votes',
                data: [2, 9, 3, 5, 2, 3, 4],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
        };
      default:
        return undefined;
    }
  };

  const onDrop = (layout: Layout[]) => {
    let currentItem = [...layout].pop();
    const defaultWidthHeight = getChartDefaultWidthHeight(currentElementType);
    if (!currentItem) return;
    currentItem = {
      ...currentItem,
      i: uuidv4(),
      ...defaultWidthHeight,
    };
    const updatedLayouts = { ...layouts, md: layout };
    setLayouts(updatedLayouts);
    const updatedElements = getElement(chartElements, layout);
    const createdItem = createItem(currentElementType, currentItem!)!;
    setChartElements([...updatedElements, createdItem]);
    setEditingChart(createdItem);
    setOutSize(false);
  };

  const handleDragStart = (_layout: Layout[], currentItem: Layout) => {
    setEditingChart(
      chartElements.find((element) => element.id === currentItem.i),
    );
    console.log('handleDragStart');
    setOutSize(false);
  };

  const handleDragStop = (layout: Layout[], currentItem: Layout) => {
    setChartElements(getElement(chartElements, layout));
    setEditingChart(
      getElement(chartElements, layout).find(
        (element) => element.id === currentItem.i,
      ),
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  const ref = useClickOutside(() => {
    setOutSize(true);
  });
  return (
    <div
      ref={ref}
      className='w-full rounded-md border border-solid border-slate-200 bg-white px-9 py-7'
    >
      <ResponsiveReactGridLayout
        className={cn('min-h-[200px]', {
          'rounded-md border-2 border-dashed border-slate-300 bg-slate-100':
            chartElements.length < 1,
        })}
        width={120}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={30}
        layouts={layouts}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        isResizable={true}
        isDroppable={!isDisabled}
        isDraggable={!isDisabled}
        verticalCompact={false}
        containerPadding={[0, 0]}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        droppingItem={{
          i: FLEETING_INDEX,
          ...getChartDefaultWidthHeight(currentElementType),
        }}
      >
        {chartElements.map((element) => (
          <div
            key={element.id}
            data-grid={element.gridSize}
            className={cn(
              'flex w-full cursor-move flex-col justify-center rounded-md border-[3px] border-solid border-transparent bg-white px-2',
              {
                'react-draggable-dragging border-[3px] border-blue-500 !will-change-auto':
                  element.id === editingChart?.id,
              },
            )}
          >
            <FactoryChart
              chart={element}
              isActive={element.id === editingChart?.id}
            />
            {element.id === editingChart?.id && (
              <>
                <ListDataChart
                  chart={element}
                  updateChartItems={updateItem}
                  handleChangeData={handleChangeData}
                  isActive={false}
                  outSize={outSize}
                  setOutSize={setOutSize}
                  formId={Number.parseInt(formId!)}
                />

                <RemoveItem removeItem={removeItem} id={editingChart.id} />
              </>
            )}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};
